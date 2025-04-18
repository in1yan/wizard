import os
import faiss
from dotenv import load_dotenv
from typing import List, TypedDict

from langchain import hub
from langchain.chains import RetrievalQA
from langchain_core.documents import Document
from langchain_core.messages import SystemMessage
from langchain_core.tools import tool
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from langgraph.graph import START, StateGraph, MessagesState, END
from langgraph.prebuilt import ToolNode, tools_condition
load_dotenv()

# Initialize LLM and embedding model
llm = ChatGroq(model="meta-llama/llama-4-scout-17b-16e-instruct", temperature=0.3)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
embedding_dim = len(embeddings.embed_query("test"))
index = faiss.IndexFlatL2(embedding_dim)

# Vector store setup
v_store = FAISS(
    embedding_function=embeddings,
    index=index,
    docstore=InMemoryDocstore(),
    index_to_docstore_id={}
)

# Load and chunk PDFs
def load_docs(file_paths):
    all_docs = []
    for file_path in file_paths:
        loader = PyPDFLoader(file_path)
        docs = loader.load_and_split()
        all_docs.extend(docs)
    return all_docs
def gen_chunk(files):
    if os.path.exists("vectorstore"):
        v_store.load_local("vectorstore", embeddings, allow_dangerous_deserialization=True)
    else:
        txt_spliter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = txt_spliter.split_documents(load_docs(files))
        v_store.add_documents(chunks)
        v_store.save_local("vectorstore")

# Tool for retrieving context
@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Retrieve information related to a query."""
    docs = v_store.similarity_search(query, k=2)
    serialized = "\n\n".join(
        f"Source: {doc.metadata}\nContent: {doc.page_content}" for doc in docs
    )
    return serialized, docs

# Node to use the tool if necessary
def query_or_respond(state: MessagesState):
    llm_tools = llm.bind_tools([retrieve])
    response = llm_tools.invoke(state["messages"])
    return {"messages": [response]}
tools = ToolNode([retrieve])
# Node to generate the final answer
def generate(state: MessagesState) -> MessagesState:
    recent_tool_msgs = []
    for message in reversed(state["messages"]):
        if message.type == "tool":
            recent_tool_msgs.append(message)
        else:
            break
    tool_msgs = recent_tool_msgs[::-1]
    docs_content = "\n\n".join(doc.content for doc in tool_msgs)

    system_message_content = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you don't know. "
        "Use three sentences maximum and keep the answer concise.\n\n"
        f"{docs_content}"
    )

    conversation = [
        msg for msg in state["messages"]
        if msg.type in ("human", "system") or (msg.type == "ai" and not msg.tool_calls)
    ]
    prompt = [SystemMessage(system_message_content)] + conversation
    response = llm.invoke(prompt)

    return {"messages": [response]}

# Graph construction
graph_builder = StateGraph(MessagesState)
graph_builder.add_node(query_or_respond)
graph_builder.add_node(tools)
graph_builder.add_node(generate)

graph_builder.set_entry_point("query_or_respond")
graph_builder.add_conditional_edges(
    "query_or_respond",
    tools_condition,
    {END: END, "tools": "tools"}
)
graph_builder.add_edge("tools", "generate")
graph_builder.add_edge("generate", END)

graph = graph_builder.compile()

if __name__ == "__main__":
    gen_chunk(["uploads/test1.pdf", "uploads/test2.pdf"])
    # input_message = "Hello"

    # for step in graph.stream(
    #     {"messages": [{"role": "user", "content": input_message}]},
    #     stream_mode="values",
    # ):
    #     step["messages"][-1].pretty_print()
    while True:
        query = input("Enter your question: ")
        if query.lower() == "exit":
            break

        state = graph.invoke({"messages": [{"role": "user", "content": query}]})
        print(state["messages"][-1].pretty_print())
