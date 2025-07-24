// src/App.js
import { useState, useRef } from 'react';
import axios from 'axios';

// --- SVG Icon Components ---

const CopyIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const UploadIcon = ({ className = "h-8 w-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const ProcessIcon = ({ className = "h-8 w-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const SummaryIcon = ({ className = "h-8 w-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setTranscript('');
        setSummary('');
        setStatusMessage('');
    }
  };

  const handleTranscribe = async () => {
    if (!file) {
      setStatusMessage('Please select an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setStatusMessage('Uploading and transcribing audio...');
    setTranscript('');
    setSummary('');

    try {
      const res = await axios.post('http://localhost:8000/transcribe', formData);
      setTranscript(res.data.transcript);
      setStatusMessage('Audio transcribed successfully!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error uploading/transcribing audio.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!transcript) {
      setStatusMessage('Please transcribe an audio file first.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Generating summary...');

    try {
      const res = await axios.post('http://localhost:8000/summarize', {
        transcript,
      });
      setSummary(res.data.summary);
      setStatusMessage('Summary generated successfully!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error generating summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (textToCopy, type) => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyStatus(`${type} copied to clipboard!`);
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus(`Failed to copy ${type}.`);
      setTimeout(() => setCopyStatus(''), 2000);
    }
    document.body.removeChild(textArea);
  };
  
  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* --- Header --- */}
        <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                🎙️ InsightBot
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your long audio and video calls into clear transcripts and concise summaries in seconds.
            </p>
        </header>

        {/* --- Main Action Panel --- */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <button 
              onClick={handleFileSelectClick}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {fileName || 'Select an Audio File'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleTranscribe}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !file}
            >
              {isLoading && statusMessage.includes('transcribing') ? 'Transcribing...' : 'Transcribe Audio'}
            </button>

            <button
              onClick={handleSummarize}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !transcript}
            >
              {isLoading && statusMessage.includes('Generating summary') ? 'Summarizing...' : 'Generate Summary'}
            </button>
          </div>
          
          {statusMessage && (
              <p className="text-center text-sm text-gray-400 mt-6">{statusMessage}</p>
          )}
        </div>

        {/* --- How It Works Section --- */}
        {!transcript && !summary && (
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                        <UploadIcon className="h-10 w-10 mx-auto mb-4 text-blue-400"/>
                        <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
                        <p className="text-gray-400">Select any audio or video file from your device.</p>
                    </div>
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                        <ProcessIcon className="h-10 w-10 mx-auto mb-4 text-purple-400"/>
                        <h3 className="text-xl font-semibold mb-2">2. Transcribe</h3>
                        <p className="text-gray-400">Our AI generates a complete, accurate transcript of the conversation.</p>
                    </div>
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700">
                        <SummaryIcon className="h-10 w-10 mx-auto mb-4 text-green-400"/>
                        <h3 className="text-xl font-semibold mb-2">3. Summarize</h3>
                        <p className="text-gray-400">Get a concise summary with key takeaways and action items.</p>
                    </div>
                </div>
            </div>
        )}

        {/* --- Results Section --- */}
        {copyStatus && (
          <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300">
            {copyStatus}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transcript && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">📜 Transcript</h3>
                <button
                  onClick={() => copyToClipboard(transcript, 'Transcript')}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 px-4 rounded-full flex items-center transition-colors"
                >
                  <CopyIcon className="h-4 w-4 mr-2"/> Copy
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto pr-2">
                <p className="text-gray-300 whitespace-pre-wrap text-base leading-relaxed">{transcript}</p>
              </div>
            </div>
          )}

          {summary && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">📝 Summary</h3>
                <button
                  onClick={() => copyToClipboard(summary, 'Summary')}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 px-4 rounded-full flex items-center transition-colors"
                >
                  <CopyIcon className="h-4 w-4 mr-2"/> Copy
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto pr-2">
                <p className="text-gray-300 whitespace-pre-wrap text-base leading-relaxed">{summary}</p>
              </div>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        <footer className="text-center mt-16 text-gray-500">
            <p>&copy; {new Date().getFullYear()} InsightBot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
