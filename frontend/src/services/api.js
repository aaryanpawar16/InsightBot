const API_URL = 'http://localhost:5000/api/video';

/**
 * Uploads a video or audio file to the backend and returns the summary.
 * @param {File} file The media file to summarize.
 * @returns {Promise<object>} A promise that resolves to the summary object.
 */
export const summarizeFromFile = async (file) => {
  const formData = new FormData();
  formData.append('media', file); // Use a more generic name for the file

  try {
    console.log('Sending media file to the backend...');
    
    // The endpoint is updated to be more specific
    const response = await fetch(`${API_URL}/summarize-file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error in summarizeFromFile service:', error);
    throw error;
  }
};

/**
 * Sends a video URL to the backend for summarization.
 * @param {string} url The URL of the video to summarize.
 * @returns {Promise<object>} A promise that resolves to the summary object.
 */
export const summarizeFromUrl = async (url) => {
  try {
    console.log('Sending URL to the backend...');

    // New endpoint for handling URLs
    const response = await fetch(`${API_URL}/summarize-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error in summarizeFromUrl service:', error);
    throw error;
  }
};
