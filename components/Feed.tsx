"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";
import { setTimeout } from "timers";
import { log } from "console";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any;
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => {
        return (
          <PromptCard
            key={post.creator._id}
            post={post}
            handleTagClick={handleTagClick}
            handleDelete={() => {}}
            handleEdit={() => {}}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchText, setsearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number>(1000);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handlerSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      window.setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setsearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handlerSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
