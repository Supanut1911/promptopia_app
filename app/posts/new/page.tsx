import React from "react";

export interface User {
  id: number;
  name: string;
}

const page = async () => {
  const url = "http://localhost:3000/api/users";
  const res = await fetch(url);
  const resJSON: Promise<User[]> = res.json();
  const data = await resJSON;

  return (
    <div>
      {data.map((i) => {
        return (
          <li key={i.id}>
            {i.id}, {i.name}
          </li>
        );
      })}
    </div>
  );
};

export default page;
