import React, { useState } from 'react';
import { summarizeFromFile, summarizeFromUrl } from '../../services/api';
import SummaryDisplay from '../common/SummaryDisplay';

const VideoUploadForm = () => {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    // Reset state
    setIsLoading(true);
    setSummary('');
    setError('');

    try {
      let result;
      if (uploadMode === 'file') {
        if (!file) {
          throw new Error('Please select a file to upload.');
        }
        result = await summarizeFromFile(file);
      } else {
        if (!url) {
          throw new Error('Please enter a URL.');
        }
        result = await summarizeFromUrl(url);
      }

      if (result && result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error(result.message || 'The response from the server was empty or malformed.');
      }
    } catch (err) {
      console.error('Error during summarization:', err);
      setError(`Failed to get summary: ${err.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900/50 border border-gray-800 p-8 rounded-2xl shadow-lg">
      {/* Tabs for switching between File and URL */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setUploadMode('file')}
          className={`py-2 px-4 font-semibold transition-colors duration-300 ${uploadMode === 'file' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Upload File
        </button>
        <button
          onClick={() => setUploadMode('url')}
          className={`py-2 px-4 font-semibold transition-colors duration-300 ${uploadMode === 'url' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          From URL
        </button>
      </div>

      {/* Conditional rendering based on the selected mode */}
      {uploadMode === 'file' ? (
        <div className="mb-6">
          <label htmlFor="video-upload" className="block text-gray-400 mb-2">Upload Video or Audio File</label>
          <input type="file" id="video-upload" name="video-upload" onChange={handleFileChange} accept="video/*,audio/*" className="w-full bg-gray-800 border border-gray-700 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600" />
        </div>
      ) : (
        <div className="mb-6">
          <label htmlFor="url-input" className="block text-gray-400 mb-2">Paste Video URL (e.g., YouTube)</label>
          <input type="text" id="url-input" value={url} onChange={handleUrlChange} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
        </div>
      )}

      <div className="text-center">
        <button onClick={handleSubmit} disabled={isLoading} className="glow-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? 'Processing...' : 'Get Insights'}
        </button>
      </div>
      
      {error && (
        <div className="mt-8 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-300 text-center">
          {error}
        </div>
      )}

      {summary && !isLoading && (
        <SummaryDisplay summaryText={summary} />
      )}
    </div>
  );
};

export default VideoUploadForm;
