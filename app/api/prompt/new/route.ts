import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: any, res: NextApiResponse) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Fail to create new prompt", { status: 400 });
  }
};
