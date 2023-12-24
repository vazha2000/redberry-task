import React, { useEffect, useState } from "react";
import "./HeroBlogs.scss";
import { BlogCard } from "../BlogCard";
import axios from "axios";

type TBlogsType = {
  data: [
    {
      id: number;
      author: string;
      title: string;
      description: string;
      publish_date: string;
      categories: {
        id: number;
        title: string;
        text_color: string;
        background_color: string;
      }[];
      image: string;
    }
  ];
};
export const HeroBlogs = () => {
  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";

  const [blogData, setBlogData] = useState<TBlogsType>();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.blog.redberryinternship.ge/api/blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="heroBlogs-wrapper">
      <div className="heroBlogs">
        {blogData?.data.map((item) => (
          <BlogCard
            key={item.id}
            author={item.author}
            publishDate={item.publish_date}
            title={item.title}
            categories={item.categories}
            description={item.description}
            image={item.image}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};
