import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

interface PropType {
  params: any;
}

export const GET = async ({ params }: PropType) => {
  try {
    await connectToDB();

    const response = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Fail to fetch Prompt data error: ${error}`, {
      status: 400,
    });
  }
};
