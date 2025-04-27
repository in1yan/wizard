
![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 Wizard AI

> 🧙‍♂️ Your ultimate AI-powered study assistant — helping you **learn smarter, not harder**!

---

## 📌 Problem Statement

**Problem Statement 1 - Weave AI magic with Groq**

---

## 🎯 Objective

Many students and self-learners face the challenge of sifting through massive study materials — PDFs, notes, and lecture slides — especially during exams.  
Manual skimming, note-taking, and understanding complex topics can be ⏳ **time-consuming and inefficient**.

Wizard AI solves this with an AI-powered assistant that helps learners:

- ❓ Get instant answers to their queries  
- 📝 Summarize large chunks of study content  
- 🧠 Visualize complex concepts with AI-generated mind maps  
- 💾 Save important chats as study notes

Perfect for exam prep, quick concept revision, and interactive learning!

---

## 🧠 Approach
- Chose this problem to reduce the stress and inefficiencies of last-minute studying.  
- Focused on **speed** and **clarity** — providing instant results powered by **Groq’s blazing fast inference**.  
- Brainstormed visual tools and landed on mind maps as a breakthrough to help retain information better.  
- Built an intuitive and minimal UI with support for saving conversations as notes.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- **Frontend:** React + Tailwind CSS + mermaid js
- **Backend:** FastAPI + Langchain + Langgraph + Sqlalchemy  
- **Database:** postgres(On supabase) / sqlite(Testing)
- **APIs:** OpenAI/Groq + Custom mind map generation logic  
- **Hosting:** Frontend(vercel) , Backend(None)

### Sponsor Technologies Used:
- [x] **Groq:** Used for real-time, low-latency Q&A and mind map generation, with langchain. 
- [ ] **Monad**  
- [ ] **Fluvio**  
- [ ] **Base**  
- [ ] **Screenpipe**  
- [ ] **Stellar**

---

## ✨ Key Features

- ✅ **Upload Documents or notes or youtube lectures** and get answers from the content  
- ✅ **Ask questions** in natural language, powered by Groq's fast inference  
- ✅ **Summarize large documents** into key points  
- ✅ **AI-generated mind maps** to visualize complex ideas  
- ✅ **Save Q&A sessions** as notes for future reference  

![Wizard AI screenshot](https://your-image-link.com/screenshot.png)

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [https://youtu.be/zzNlpvRekCM?si=1u2DbWPrU0-1NVY-](https://youtu.be/zzNlpvRekCM?si=1u2DbWPrU0-1NVY-)  
- **Pitch Deck / PPT Link:** [https://docs.google.com/presentation/d/wizardai-pitch](https://docs.google.com/presentation/d/wizardai-pitch)

---

## ✅ Tasks & Bonus Checklist

- [x] All members of the team completed the mandatory task  
- [ ] Bonus Task 1 - Sharing of Badges (2 points)  
- [x] Bonus Task 2 - Signed up for Sprint.dev (3 points)

---

## 🧪 How to Run the Project

### Requirements:
- Node.js
- Python
- supabase db url or local sqlite db
- Groq API key  
- `.env` file with:
>Note:
>The `.env` file should be saved in `./backend` folder
```env
GROQ_API_KEY=your_key
HASH_KEY=your_key_to_hash_the_passwords
SUPABASE_DB_URL=your_supabasedb_url_or_local_sqllite_url
```

### Local Setup:
#### Without docker
```bash
# Clone the repo
git clone https://github.com/in1yan/wizard

# for frontend
# Install dependencies
cd wizard/frontend
npm install

# Start development server(in frontend folder)
npm run dev

# for backend
cd wizard/backend
pip install -r requirements.txt
python app.py
```
Then you can acess the fronend on `http://localhost:8080` and backend on `http://localhost:8000`
API docs can be accessed on `http://localhost:8000/docs`.

#### with docker
```bash
# Clone the repo
git clone https://github.com/in1yan/wizard
# ensure docker is installed
cd wizard
docker-compose up --build
```
Then you can acess the fronend on `http://localhost:3000` and backend on `http://localhost:8000`
API docs can be accessed on `http://localhost:8000/docs`.

---

## 🧬 Future Scope

- 📱 Mobile app version  
- 📌 Flashcard generator for spaced repetition  
- 🧩 Integration with Google Drive or Notion  
- 📤 Shareable mind maps & notes
- 📑 syllabus tracker

---

## 📎 Resources / Credits

- [Groq SDK](https://groq.com/)  
- [mermaid.js](https://mermaid.js.org/)  
- [Tailwind CSS](https://tailwindcss.com)  
- [React](https://react.dev/)
- [langchain](https://www.langchain.com/)
- [langgraph](https://www.langchain.com/langgraph)

---

## 🏁 Final Words

This was my first hackathon and had a lots of fun. Building Wizard AI was an amazing journey — from late-night coding to last-minute debugging.  
I learned how to optimize AI response times with Groq, worked under pressure, and learned a lot about langchain and ai.  
Shoutout to mentors and the hackathon team for the support! 🚀💙
