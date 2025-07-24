InsightBot 🤖
Ask questions, get insights. Chat with your documents and data using the power of AI.

InsightBot is a powerful, self-hostable application that transforms your static documents into an interactive conversational resource. Upload your PDFs, text files, or other documents, and ask questions in natural language to get instant, context-aware answers pulled directly from your content.

✨ About The Project
Navigating through dense technical manuals, lengthy reports, or academic papers can be time-consuming. InsightBot solves this problem by leveraging Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs). It ingests your documents, indexes the content in a vector database, and uses this knowledge base to provide accurate answers to your questions, complete with source references.

This tool is perfect for researchers, students, developers, and businesses looking to unlock the knowledge hidden within their documents.

Key Features
💬 Natural Language Queries: Ask questions in plain English, just like you're talking to a person.

📚 Multi-Document Support: Works with various file formats (.pdf, .txt, .md, .csv).

🎯 Context-Aware Answers: The AI provides answers based only on the content of the documents you provide.

🔍 Source Citing: Pinpoints the exact documents or pages used to generate an answer, ensuring verifiability.

🌐 Simple Web Interface: Easy-to-use interface built with Streamlit for uploading files and chatting.

🔒 Secure & Private: Self-host the application to keep your documents and conversations completely private.

Demo: Check out Demo Video of [InsightBot](https://youtu.be/Zmt4a-zDNZA?si=vrmxikaemJmugoQ-) on YouTube
Screenshot:
<img width="1882" height="895" alt="Screenshot 2025-07-24 192318" src="https://github.com/user-attachments/assets/33977c92-7324-4ea3-956a-87cfb0b97f9b" />


Built With
This project is built with a modern Python stack for AI applications:

Python

LangChain - The core framework for chaining LLM operations.

Google Gemini / OpenAI API - The Large Language Model for understanding and generation.

🚀 Getting Started
Follow these instructions to get a local copy up and running.

Prerequisites
You need to have the following installed on your system:

Python 3.9+ and Pip

Git (for cloning the repository)

You will also need an API key from an LLM provider:

Google AI API Key: Get one from Google AI Studio

OR

OpenAI API Key: Get one from the OpenAI Platform

Installation
Clone the repository:

git clone https://github.com/your_username/InsightBot.git
cd InsightBot
Create and activate a virtual environment:

Windows:
python -m venv venv
.\venv\Scripts\activate

macOS / Linux:
python3 -m venv venv
source venv/bin/activate

Install the required dependencies:
pip install -r requirements.txt

Set up your environment variables:

Create a file named .env in the root directory of the project.

Add your API key to the .env file. Choose the key for the model you want to use.

Code snippet

# Example for Google Gemini
GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"

# Example for OpenAI (if you've configured the code to use it)
# OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

Launch the Backend: App.py from your terminal.

python App.py


Launch the Frontend: App.js from your terminal.

npm start

Interact with InsightBot:

Your browser should automatically open to the web interface (usually http://localhost:8501).

The app will process the documents in the data folder.

Once processed, you can start asking questions in the chat input box.

Project Link: https://github.com/aaryanpawar16/InsightBot
