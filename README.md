InsightBot 🤖
Turn hours of meetings into minutes of insights. InsightBot is an AI-powered web application that automatically summarizes video and audio recordings into clear, actionable notes.
<img width="2816" height="1536" alt="diagram" src="https://github.com/user-attachments/assets/ae0934d3-d522-4ee1-b996-07c0701000e4" />


About The Project
InsightBot was created to solve a universal problem in today's professional world: information overload from endless meetings. This tool allows users to upload a media file or paste a URL from a site like YouTube. It then leverages a powerful AI pipeline to transcribe the conversation, identify different speakers, and generate a structured summary with key points, decisions, and action items.

The goal is to save time, increase productivity, and ensure the critical information from any meeting is easily accessible.

Built With
This project was built using a modern, full-stack architecture, combining a dynamic frontend with a powerful backend and cutting-edge AI services.

Frontend:

React

Tailwind CSS

Backend:

Node.js

Express.js

External AI Services:

AssemblyAI API - for Transcription and Speaker Identification.

OpenAI API (GPT-4) - for Summarization.

Key Libraries:

yt-dlp-wrap & @ffmpeg-installer/ffmpeg - for processing video URLs.

formidable - for handling file uploads.

pdfkit - for generating PDF exports.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You will need the following software installed on your machine:

Node.js and npm: Download Here

Git

Installation
Clone the repo

Bash

git clone https://github.com/aaryanpawar16/InsightBot.git
Set Up the Backend

Bash

cd insightbot/backend
npm install
Create a .env file in the backend root and add your API keys:

Code snippet

ASSEMBLYAI_API_KEY=YOUR_ASSEMBLYAI_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
Set Up the Frontend

Bash

cd ../frontend
npm install
Run the Application

In one terminal, start the backend server:

Bash

cd insightbot-backend
npm run dev
In another terminal, start the frontend React app:

Bash

cd insightbot-frontend
npm start
Your application should now be running on http://localhost:3000.

Project Workflow
The application follows a simple but powerful data flow to process your requests.

Input: The user provides a media file or a URL on the React frontend.

Backend Processing: The Node.js server receives the request. For URLs, it uses yt-dlp to download and extract the audio.

Transcription: The audio is sent to the AssemblyAI API to be transcribed and analyzed for different speakers.

Summarization: The detailed transcript is then sent to the OpenAI API to be summarized into a structured format.

Output: The final summary is sent back to the React frontend and displayed to the user in a clean, readable format.

🔮 What's next for InsightBot
The current version is just the foundation. We have an exciting roadmap ahead focused on collaboration and deeper integration.

User Accounts & Team Workspaces: To allow users to save their meeting history and share summaries securely with their teams.

Seamless Workflow Integration: Connecting InsightBot to tools like Slack, Asana, and Google Calendar to automatically post summaries and create tasks from action items.

Real-Time Meeting Assistant: The ultimate vision is for InsightBot to "join" live meetings on platforms like Zoom and Google Meet, providing the summary the moment the meeting ends.



