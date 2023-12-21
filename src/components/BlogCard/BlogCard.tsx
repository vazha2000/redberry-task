import React from "react";
import "./BlogCard.scss";

export const BlogCard = () => {
  return (
    <div className="blogCard-wrapper">
      <div className="blogCard">
        <div className="blogCard__image">
          <div className="image"></div>
        </div>
        <div className="blogCard__content">
          <h4>ნია გოგსაძე</h4>
          <header className="blogCard__content__info">
            <time>02.11.2023</time>
            <h2>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h2>
            <ul className="blogCard__content__info__list">
              <li>მარკეტი</li>
              <li>მარკეტი</li>
              <li>მარკეტი</li>
            </ul>
            <section>
              6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
              სიზუსტისთვის, ეს პროცესი Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Assumenda, magnam? Nihil mollitia, inventore
              ipsa itaque molestiae impedit deserunt praesentium quas. Deserunt
              veritatis officiis culpa harum repudiandae possimus quibusdam
              laudantium fugiat.
            </section>
            <footer>
              <div className="see-full">
                <span>სრულად ნახვა</span>
                <img src="assets/svg/arrow.svg" alt="arrow top right" />
              </div>
            </footer>
          </header>
        </div>
      </div>
    </div>
  );
};
