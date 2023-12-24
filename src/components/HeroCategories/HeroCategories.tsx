import React, { useEffect, useState } from "react";
import "./HeroCategories.scss";
import { useFetch } from "../../utils/useFetch";

export type TCategory = {
  data: [
    {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    }
  ];
};

export const HeroCategories = () => {
  const url = "https://api.blog.redberryinternship.ge/api/categories";
  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";

  const initialCategoriesData: TCategory = {
    data: [
      {
        id: 0,
        title: "",
        text_color: "",
        background_color: "",
      },
    ],
  };

  const [categoriesData, loading] = useFetch<TCategory>(
    url,
    token,
    initialCategoriesData
  );


  return (
    <div className="heroCategories-wrapper">
      <div className="heroCategories">
        {categoriesData.data.map((item) => (
          <button key={item.id} className="heroCategories__button" style={{color: item.text_color, backgroundColor: item.background_color}}>
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
