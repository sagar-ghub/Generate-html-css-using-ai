import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

// Initialize the AI instance
// const ai = new AI({
//   provider: 'openai',
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
const model = google('gemini-1.5-pro-latest');

const generateHtmlCss = async (prompt: string) => {
  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo-0125', // You can also use 'gpt-3.5-turbo'
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are a helpful assistant that generates HTML and CSS for landing pages.',
    //     },
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    // });
    const { text } = await generateText({
      model: google("models/gemini-1.5-pro-latest"),
      prompt: "I want only the html document as text, please do not provide any additional text with it, just the HTML/CSS code as plain text which i will render and i will be sending our chat history  if any along with new input using # separated value with the last one being the latest and here is the requirement:"+prompt,
    });
    // const response = await ai.generate({
    //   model: 'gpt-4', // Specify the model
    //   prompt: `
    //     You are an AI assistant that generates well-structured HTML and CSS code for landing pages. 
    //     Given the following description, generate a full HTML/CSS snippet:
        
    //     Description: ${prompt}
    //   `,
    //   temperature: 0.7,
    //   maxTokens: 500,
    // });

    return text || 'Error generating HTML/CSS';
    // return response.choices[0].message?.content || 'Error generating HTML/CSS';
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to generate HTML/CSS');
  }
};

export async function POST(req: Request) {
  
    const { prompt } = await req.json();
    console.log("hi",prompt)
    if (!prompt) {
      return NextResponse.json({ message: "Prompt not provided" });
    }
    // return  NextResponse.json({ message: "Hello World" });
    try {
      const htmlCss = await generateHtmlCss(prompt);
      // const htmlCss=""
    return NextResponse.json({ htmlCss });
    } catch (error) {
      return NextResponse.json({ error:"Error fetching AI" });
    }
  
}
