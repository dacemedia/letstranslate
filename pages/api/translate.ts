import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const prompt = req.query.prompt;

    if (!prompt){
        return res.status(400).json({error: "Prompt missingg"});

    }

    if (prompt.length > 100){
        return res.status(400).json({error: "Prompt too long"});
    }

    const {query = "bonjour", language = "English"} = req?.body;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `translate ${query}?? in ${language}`,
        max_tokens: 200,
        temperature: 0.8,
        presence_penalty: 0,
        frequency_penalty: 0,
    });

    const answer = completion.data.choices[0].text;
    res.status(200).json({answer});
    
}