const { default: formidable } = require('formidable');
const fs = require('fs');
const path = require('path');
const os = require('os');
const YtDlpWrap = require('yt-dlp-wrap').default;
const ffmpeg = require('@ffmpeg-installer/ffmpeg'); // Import the ffmpeg installer
const PDFDocument = require('pdfkit');
const { transcribeAudio } = require('../services/transcriptionService');
const { summarizeText } = require('../services/summarizationService');

// Initialize yt-dlp
const ytDlpWrap = new YtDlpWrap();

// --- Automatically download the yt-dlp binary on server start ---
(async () => {
    try {
        console.log('Checking for yt-dlp binary...');
        await YtDlpWrap.downloadFromGithub();
        console.log('yt-dlp binary is ready.');
    } catch (error) {
        console.error('Failed to download yt-dlp binary.', error);
    }
})();


// --- Summarize from a File Upload ---
const summarizeFromFile = async (req, res, next) => {
    const form = formidable({});
    
    form.parse(req, async (err, fields, files) => {
        if (err) return next(err);

        const mediaFile = files.media;
        if (!mediaFile) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const filePath = mediaFile[0].filepath;

        try {
            console.log('Uploading file for transcription...');
            const transcriptData = await transcribeAudio(filePath);
            
            let formattedTranscript = transcriptData.utterances 
                ? transcriptData.utterances.map(u => `Speaker ${u.speaker}: ${u.text}`).join('\n')
                : transcriptData.text;

            console.log('Summarizing transcript...');
            const summaryResult = await summarizeText(formattedTranscript);
            console.log('Summarization successful.');

            fs.unlinkSync(filePath);
            res.status(200).json({ summary: summaryResult });

        } catch (error) {
            console.error('Error in file summarization process:', error);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            next(error);
        }
    });
};

// --- Summarize from a URL ---
const summarizeFromUrl = async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'Invalid URL provided.' });
    }

    const tempFileName = `audio_${Date.now()}.mp3`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);
    
    try {
        console.log(`Downloading audio from ${url}...`);
        
        // Download and extract audio, providing the path to the ffmpeg binary
        await ytDlpWrap.execPromise([
            url,
            '--ffmpeg-location', ffmpeg.path, // Provide the path to ffmpeg
            '-x', // Extract audio
            '--audio-format', 'mp3',
            '-o', tempFilePath,
        ]);
        
        console.log('Audio downloaded. Transcribing...');
        const transcriptData = await transcribeAudio(tempFilePath);

        let formattedTranscript = transcriptData.utterances
            ? transcriptData.utterances.map(u => `Speaker ${u.speaker}: ${u.text}`).join('\n')
            : transcriptData.text;

        console.log('Summarizing transcript...');
        const summaryResult = await summarizeText(formattedTranscript);
        console.log('Summarization successful.');

        fs.unlinkSync(tempFilePath);
        res.status(200).json({ summary: summaryResult });

    } catch (error) {
        console.error('Error in URL summarization process:', error);
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        next(error);
    }
};


// --- Export as PDF ---
const exportAsPdf = (req, res, next) => {
    try {
        const { summary } = req.body;
        if (!summary) {
            return res.status(400).json({ message: 'No summary text provided.' });
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=InsightBot-Summary.pdf');
        doc.pipe(res);
        doc.fontSize(20).text('InsightBot Meeting Summary', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(summary);
        doc.end();

    } catch (error) {
        next(error);
    }
};

module.exports = {
    summarizeFromFile,
    summarizeFromUrl,
    exportAsPdf,
};
