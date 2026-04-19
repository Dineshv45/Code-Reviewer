# AI Code Reviewer

An intelligent, full-stack code analysis platform that provides pedagogical feedback, performance optimization suggestions, and structured debugging using Large Language Models (LLMs).

<img width="1356" height="633" alt="image" src="https://github.com/user-attachments/assets/9d137c8d-a824-4bba-9fdd-ff3bd1c4040f" />

## ✨ Features

- **AI-Driven Feedback**: Delivers structured reviews focusing on logical correctness, security vulnerabilities, and pedagogical learning points.
- **Complexity Analysis**: Automatically identifies algorithmic complexity and provides Big O notation insights.
- **Weighted Language Detection**: Features a custom-built statistical scoring algorithm that detects 7+ programming languages by scanning token frequency across 30+ lines of code.
- **Pro-Grade Editor**: Integrated with **CodeMirror 6**, featuring dynamic syntax highlighting and an IDE-like interactive workspace.
- **Premium UX**: A responsive, glassmorphic design built with **Tailwind CSS**, optimized for developer focus and low-latency interaction.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, CodeMirror 6, Axios.
- **Backend**: Node.js, Express.js, Groq SDK / Gemini API.
- **AI Model**: Llama-3.3-70b (via Groq) optimized for pedagogical code review.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- LLM API Key (Groq or Gemini)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/code-reviewer.git
cd code-reviewer

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```env
PORT=3000
GROQ_API_KEY=your_api_key_here
```

### 4. Run the Application

```bash
# In backend directory
npm run dev

# In frontend directory
npm run dev
```

Visit `http://localhost:5173` to start reviewing!
