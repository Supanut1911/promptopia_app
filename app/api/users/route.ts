import type { NextApiRequest, NextApiResponse } from "next";

//http://localhost:3000/api/users [GET]
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" },
  ];
  return new Response(JSON.stringify(users));
}
export async function HEAD(request: Request, response: Response) {}

export async function POST(request: Request, response: Response) {}

export async function PUT(request: Request, response: Response) {}

export async function PATCH(request: Request, response: Response) {}

export async function DELETE(request: Request, response: Response) {}
