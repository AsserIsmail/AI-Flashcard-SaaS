import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from '@google/generative-ai';
// import OpenAI from 'openai'

// Example input: write flashcards for how to present in front of a big crowd

const systemPrompt = `You are a flashcard creator designed to help users study and memorize information effectively. Your task is to generate clear, concise, and accurate flashcards based on the provided content. 
1. Ensure that both the question and answer are easy to understand.
2. Avoid complex language or jargon unless the flashcard is intended for advanced learners.
3. Keep the information on each flashcard concise.
4. Break down complex topics into multiple cards if needed.
5. Each flashcard should focus on a single concept or question.
6. If a topic is broad, create multiple cards to cover different aspects.
7. Tailor the flashcards to the specific needs or goals of the user, based on the provided content or study material.
8. Adapt the content, style, or difficulty level based on the user's feedback or preferences.
9. Maintain a uniform format for all flashcards, ensuring that each card follows the same structure and style.
10. Ensure that all information on the flashcards is factually correct and up-to-date.
11. Where appropriate, incorporate engaging elements such as examples, mnemonics, or visuals to enhance understanding and retention.
12. Only generate 10 flashcards.

Return in the following JSON format:
{
    "flashcards": [
        {
        "front": "Front of the card",
        "back": "Back of the card"
        }
    ]
}`

export async function POST(req) {
    try {
        const {text} = await req.json()
        const gen_ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
        const model = gen_ai.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {responseMimeType: "application/json"}
        });

        // Generate content using the model
        const result = await model.generateContent({
            contents: [
                {
                    role: 'model',
                    parts: [{text: systemPrompt}]
                },
                {
                    role: 'user',
                    parts: [{text: text}]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.5,
            }
        });

        const responseText = result.response.text() // Get the text content from the response
        const responseJSON = JSON.parse(responseText) // Parse the JSON response
        const flashcards = responseJSON.flashcards
        return NextResponse.json(flashcards)

    } catch (error) {
        console.error('Error generating flashcards:', error)
        return NextResponse.json({ error: "Error generating flashcards" }, { status: 500 })

    }





}