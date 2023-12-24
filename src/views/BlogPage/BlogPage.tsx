import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import { Navbar } from "../../components/Navbar";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

type TBlogData = {
  author: string;
  categories: [
    {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    }
  ];
  description: string;
  email: string;
  id: number;
  image: string;
  publish_date: string;
  title: string;
};
export const BlogPage = () => {
  const { id } = useParams();
  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";

  const [data, setData] = useState<TBlogData>();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.blog.redberryinternship.ge/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="blogPage-wrapper">
        <div className="blogPage">
          <div className="blogPage__image">
            <img src={data?.image} alt="" />
          </div>
          <div className="blogPage__content">
            <h4>{data?.author}</h4>
            <header className="blogPage__content__info">
              <div className="blogPage-timeEmail">
                <p>
                  {data?.publish_date} {data?.email}
                </p>
              </div>
              <div className="blogPage-title">
                <h2>{data?.title}</h2>
              </div>
              <ul className="blogPage__content__info__list">
                {data?.categories.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      color: item.text_color,
                      backgroundColor: item.background_color,
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </header>
            <section>{data?.description}</section>
          </div>
        </div>
        <Link to="/">
          <div className="blogPage-back">
            <img src="assets/svg/arrow-left.svg" alt="arrow left" />
          </div>
        </Link>
      </div>
    </>
  );
};
