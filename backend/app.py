from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import tempfile
import whisper
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure the Gemini API client
genai.configure(api_key=GEMINI_API_KEY)

# Load Whisper model (for transcription)
whisper_model = whisper.load_model("base")

# Initialize Flask app
app = Flask(__name__)
CORS(app)


@app.route("/transcribe", methods=["POST", "OPTIONS"])
def transcribe_audio():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
        
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    audio_file = request.files['file']
    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            audio_file.save(temp_audio.name)
            temp_path = temp_audio.name

        result = whisper_model.transcribe(temp_path)
        transcript = result.get("text", "").strip()
        print("[✅ TRANSCRIPT SUCCESS]", transcript[:100])
    except Exception as e:
        print("[❌ TRANSCRIPTION ERROR]", str(e))
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

    return jsonify({"transcript": transcript})


@app.route("/summarize", methods=["POST", "OPTIONS"])
def summarize_transcript():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    data = request.get_json()
    transcript = data.get("transcript", "").strip()

    if not transcript:
        return jsonify({"error": "No transcript provided"}), 400

    prompt = f"Summarize the following meeting transcript and extract key takeaways and action items:\n\n{transcript}"

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        summary = response.text.strip()
        print("[✅ GEMINI SUMMARY SUCCESS]")
    except Exception as e:
        print("[❌ GEMINI ERROR]", str(e))
        return jsonify({"error": f"Summarization failed: {str(e)}"}), 500

    return jsonify({"summary": summary})

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

if __name__ == "__main__":
    from waitress import serve
    print("🚀 InsightBot backend running at http://localhost:8000")
    serve(app, host="0.0.0.0", port=8000)
