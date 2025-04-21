
import React from 'react';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { Message } from '@/lib/types';

const MarkdownDemo = () => {
  const demoMessage: Message = {
    id: 'demo-1',
    role: 'assistant',
    content: `# Markdown Demo
    
Here's a demonstration of the markdown styling capabilities:

## Tables

| Feature | Description | Status |
|---------|------------|--------|
| Tables | Supports formatted tables | ✅ |
| Code blocks | Syntax highlighting | ✅ |
| Lists | Ordered and unordered lists | ✅ |
| Mermaid | Diagram rendering | ✅ |

## Text Formatting

* **Bold text** for emphasis
* *Italic text* for subtle emphasis
* ~~Strikethrough~~ for outdated info

### Code Example

\`\`\`typescript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## Mermaid Diagram Example

\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
\`\`\`

## Flow Chart Example

\`\`\`mermaid
flowchart LR
    id1(Start) --> id2([Process])
    id2 --> id3{Decision?}
    id3 -->|Yes| id4[Output 1]
    id3 -->|No| id5[Output 2]
\`\`\`

## Links and Quotes

Visit [Lovable](https://lovable.dev) for more information.

> This is a blockquote that demonstrates the styling of quoted text in our theme.`,
    timestamp: new Date()
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold text-center mb-8">Markdown Rendering Demo</h1>
        <div className="max-w-3xl mx-auto">
          <ChatMessage message={demoMessage} />
        </div>
      </main>
    </div>
  );
};

export default MarkdownDemo;
