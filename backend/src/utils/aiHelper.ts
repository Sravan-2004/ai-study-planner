import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateStudySchedule = async (subjects: string[], hoursPerDay: number) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert study planner. Create a detailed weekly study schedule.',
        },
        {
          role: 'user',
          content: `Create a study schedule for these subjects: ${subjects.join(
            ', '
          )} with ${hoursPerDay} hours per day. Return as JSON.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.error('Error generating schedule:', error);
    throw error;
  }
};

export const generateQuizQuestions = async (subject: string, difficulty: string, count: number = 10) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert quiz creator. Generate multiple choice questions in JSON format.',
        },
        {
          role: 'user',
          content: `Generate ${count} ${difficulty} difficulty quiz questions about ${subject}. 
          Format: [{"question": "...", "options": ["a", "b", "c", "d"], "correctAnswer": "a", "explanation": "..."}]`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

export const getStudyBuddyResponse = async (question: string, subject: string) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful study buddy for ${subject}. Provide clear, concise explanations. Keep responses under 500 words.`,
        },
        { role: 'user', content: question },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.data.choices[0].message?.content || 'No response generated';
  } catch (error) {
    console.error('Error getting response:', error);
    throw error;
  }
};

export const generateStudyRecommendations = async (subject: string, performanceLevel: string) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert tutor. Provide personalized study recommendations.',
        },
        {
          role: 'user',
          content: `Give study recommendations for a student with ${performanceLevel} performance in ${subject}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};