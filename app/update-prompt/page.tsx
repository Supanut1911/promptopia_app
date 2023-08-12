"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const { data: session } = useSession();
  const [summitting, setSummitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const post = await response.json();
      console.log("postxx=>", post);

      setPost(post);
    };

    fetchPrompt();
  }, [promptId]);

  const updatePropmt = async (e: any) => {
    e.preventDefault();
    setSummitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSummitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={summitting}
      handleSubmit={updatePropmt}
    />
  );
};

export default EditPrompt;
