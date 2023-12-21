import React from "react";
import "./HeroBlogs.scss";
import { BlogCard } from "../BlogCard";

export const HeroBlogs = () => {
  return (
    <div className="heroBlogs-wrapper">
      <div className="heroBlogs">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};
