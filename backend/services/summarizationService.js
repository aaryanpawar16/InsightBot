const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizeText = async (transcriptWithSpeakers) => {
  try {
    console.log('Sending transcript to OpenAI for advanced summarization...');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert assistant skilled at analyzing meeting transcripts that include speaker labels (e.g., Speaker A, Speaker B). Your task is to provide a structured summary by identifying key points, decisions, and action items. Crucially, you must attribute these points to the correct speaker whenever possible.'
        },
        {
          role: 'user',
          content: `Please analyze the following transcript and provide a summary with these sections: "Key Points," "Decisions," and "Action Items." Make sure to mention which speaker made each point.\n\nTranscript:\n${transcriptWithSpeakers}`
        }
      ],
      temperature: 0.5,
      max_tokens: 512,
    });

    const summary = response.choices[0].message.content.trim();
    return summary;

  } catch (error) {
    console.error('Error summarizing text with OpenAI:', error);
    throw new Error('Failed to summarize text with OpenAI.');
  }
};

module.exports = {
  summarizeText,
};
