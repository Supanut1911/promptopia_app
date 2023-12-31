import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const response = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Fail to fetch Prompt data error: ${error}`, {
      status: 400,
    });
  }
};
