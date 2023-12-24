import React, { useEffect, useState } from "react";
import "./SimilarBlogs.scss";
import { TBlogsType } from "../HeroBlogs/HeroBlogs";
import axios from "axios";

type TSimilarBlogsProps = {
  categories?: [
    {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    }
  ]
}
export const SimilarBlogs = ({categories}: TSimilarBlogsProps) => {
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
    <div className="similarBlogs-wrapper">
      <div className="similarBlogs">
        <div className="similarBlogs__headerArrows">
          <h2>მსგავსი სტატიები</h2>
          <div className="arrows">
            <img src="assets/svg/arrow-left.svg" alt="left" />
            <img src="assets/svg/arrow-left.svg" alt="right" />
            <span>skdo</span>
          </div>
        </div>
        <div className="similarBlogs__list">
          
        </div>
      </div>
    </div>
  );
};
