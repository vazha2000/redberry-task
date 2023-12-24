import React, { useEffect, useState } from "react";
import "./SimilarBlogs.scss";
import { TBlogsType } from "../HeroBlogs/HeroBlogs";
import axios from "axios";
import { BlogCard } from "../BlogCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";

type TSimilarBlogsProps = {
  categories?: [
    {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    }
  ];
};
export const SimilarBlogs = ({ categories }: TSimilarBlogsProps) => {
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
      categories?.some(
        (selectedCategory) => selectedCategory.title === blogCategory.title
      )
    )
  );

  return (
    <div className="similarBlogs-wrapper">
      <div className="similarBlogs">
        <div className="similarBlogs__headerArrows">
          <h2>მსგავსი სტატიები</h2>
          <div className="arrows">
            <img className="custom-arrow custom-arrow-left" src="assets/svg/arrow-left.svg" alt="" />
            <img className="custom-arrow custom-arrow-right" src="assets/svg/arrow-right.svg" alt="" />
          </div>
        </div>
        <div className="similarBlogs__list">
          <Swiper
            modules={[A11y, Navigation]}
            navigation={{
              nextEl: '.custom-arrow-right',
              prevEl: '.custom-arrow-left',
            }}
            spaceBetween={72}
            slidesPerView={3}
            effect="fade"
            loop={false}
            speed={800}
            className="custom-slider"
          >
            {filteredBlogs?.map((item, index) => (
              <SwiperSlide key={index}>
                <BlogCard
                  author={item.author}
                  categories={item.categories}
                  description={item.description}
                  id={item.id}
                  image={item.image}
                  publishDate={item.publish_date}
                  title={item.title}
                  key={item.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
