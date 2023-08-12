import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
//GET (read)

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(`Fail to fetch Prompt data error: ${error}`, {
      status: 400,
    });
  }
};

//PATCH (update)
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existPrompt = await Prompt.findById(params.id);
    if (!existPrompt) return new Response("Prompt not found", { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();
    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response(`Update Prompt error:${error}`, { status: 400 });
  }
};

//DELETE (delete)
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const existPrompt = await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Delete Prompt error:${error}`, { status: 400 });
  }
};
