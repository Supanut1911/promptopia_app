import React from "react";

const page = ({ params }: { params: { postId: number } }) => {
  return <div>{params.postId}</div>;
};

export default page;
