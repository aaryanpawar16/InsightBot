const axios = require('axios');
const fs = require('fs');

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const assemblyai = axios.create({
    baseURL: 'https://api.assemblyai.com/v2',
    headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
    },
});

const transcribeAudio = async (filePath) => {
    // 1. Upload the file to AssemblyAI
    const data = fs.readFileSync(filePath);
    const uploadResponse = await assemblyai.post('/upload', data);
    const audioUrl = uploadResponse.data.upload_url;

    // 2. Create a transcription job with speaker identification enabled
    const transcriptResponse = await assemblyai.post('/transcript', {
        audio_url: audioUrl,
        speaker_labels: true, // Enable speaker identification
    });
    const transcriptId = transcriptResponse.data.id;

    // 3. Poll for the transcription result
    while (true) {
        const pollResponse = await assemblyai.get(`/transcript/${transcriptId}`);
        const transcriptData = pollResponse.data;

        if (transcriptData.status === 'completed') {
            return transcriptData;
        } else if (transcriptData.status === 'error') {
            throw new Error(`Transcription failed: ${transcriptData.error}`);
        } else {
            // Wait for a few seconds before polling again
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

module.exports = {
    transcribeAudio,
};
