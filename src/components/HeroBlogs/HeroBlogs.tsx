import React, { useEffect, useState } from "react";
import "./HeroBlogs.scss";
import { BlogCard } from "../BlogCard";
import axios from "axios";

export type TBlogsType = {
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
type THeroBlogsProps = {
  activeCategories: string[]
}
export const HeroBlogs = ({activeCategories}:THeroBlogsProps) => {

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

  const filteredBlogs = blogData?.data.filter((blog) =>
    blog.categories.some((blogCategory) =>
      activeCategories?.some(
        (selectedCategory) => selectedCategory === blogCategory.title
      )
    )
  );

  const blogsToRender = activeCategories.length > 0 ? filteredBlogs : blogData?.data;

  return (
    <div className="heroBlogs-wrapper">
      <div className="heroBlogs">
        {blogsToRender?.map((item) => (
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
