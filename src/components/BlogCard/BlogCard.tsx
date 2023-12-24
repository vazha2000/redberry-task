import React from "react";
import "./BlogCard.scss";
import { Link } from "react-router-dom";
type BlogCardProps = {
  author: string;
  publishDate: string;
  title: string;
  categories: {
    id: number;
    title: string;
    text_color: string;
    background_color: string;
  }[];
  description: string;
  image: string;
  id: number;
};
export const BlogCard = ({
  id,
  author,
  categories,
  description,
  image,
  publishDate,
  title,
}: BlogCardProps) => {
  return (
    <div className="blogCard-wrapper">
      <div className="blogCard">
        <div className="blogCard__image">
          <div className="image">
            <img src={image} alt="test" />
          </div>
        </div>
        <div className="blogCard__content">
          <h4>{author}</h4>
          <header className="blogCard__content__info">
            <time>{publishDate}</time>
            <h2>{title}</h2>
            <ul className="blogCard__content__info__list">
              {categories.map((item) => (
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
            <section>{description}</section>
            <footer>
              <Link to={`/blog/${id}`} onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
                <div className="see-full">
                  <span>სრულად ნახვა</span>
                  <img src="assets/svg/arrow.svg" alt="arrow top right" />
                </div>
              </Link>
            </footer>
          </header>
        </div>
      </div>
    </div>
  );
};
