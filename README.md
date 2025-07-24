# 🤖 InsightBot

**InsightBot** is an AI-powered meeting intelligence assistant that helps you extract key insights from long meetings, Zoom calls, or YouTube videos — all in just a few clicks.

With advanced **speech-to-text** and **natural language processing**, InsightBot turns spoken conversations into structured summaries and action points.

---

## 🚀 Features

- 🎙️ **Audio Transcription**  
  Upload recorded meetings audio — powered by **Whisper ASR** for high-accuracy transcription.

- 🧠 **Smart Summarization**  
  Get concise summaries of long discussions using **OpenAI GPT-4** or **Gemini Pro**.

- 📌 **Action Item Extraction**  
  Automatically identify follow-up tasks and decisions made during the call.

- 🌐 **Modern Frontend**  
  React-based UI with support for file uploads, status tracking, and output viewing.

---

## 🛠️ Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | React, Tailwind CSS           |
| Backend       | Flask, Python, Flask-CORS     |
| ASR           | OpenAI Whisper (via Python)   |
| Summarization | OpenAI GPT-4 / Gemini Pro     |
| Deployment    | Localhost                     |



Demo: Check out Demo Video of [InsightBot](https://youtu.be/Zmt4a-zDNZA?si=vrmxikaemJmugoQ-) on YouTube.

Screenshot:
<img width="1882" height="895" alt="Screenshot 2025-07-24 192318" src="https://github.com/user-attachments/assets/33977c92-7324-4ea3-956a-87cfb0b97f9b" />


---

## 📦 Setup Instructions

### 🔧 Backend Setup (Python + Flask)
cd backend
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

### 🖥️ Frontend Setup (React)
cd frontend
npm install
npm run dev

Interact with InsightBot:
Your browser should automatically open to the web interface (usually http://localhost:3000).

🧪 Example Usage
Upload a meeting recording (.mp3, .mp4, etc.)

Wait for transcription & processing

View:

📄 Transcript

🧠 Summary

✅ Action Items

🧠 How It Works
ASR (Whisper): Converts audio into accurate text

LLM (GPT-4/Gemini): Summarizes transcript & extracts key points

🎯 Use Cases
Business meetings

Lectures & webinars

Interview recordings

Podcast content distillation

Project Link: https://github.com/aaryanpawar16/InsightBot
