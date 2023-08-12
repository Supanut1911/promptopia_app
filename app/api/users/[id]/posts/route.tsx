import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

import { NextRequest } from "next/server";

export const GET = async (req, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const response = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Fail to fetch Prompt data error: ${error}`, {
      status: 500,
    });
  }
};
