import React, { useEffect, useState } from "react";
import "./HeroCategories.scss";
import { useFetch } from "../../utils/useFetch";

type TCategory = {
  id: number,
  title: string,
  text_color: string,
  background_color: string
}
export const HeroCategories = () => {
  const url = "https://api.blog.redberryinternship.ge/api/categories";
  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";

  const [categoriesData, loading] = useFetch<TCategory[]>(
    url, token, []
  );


  return (
    <div className="heroCategories-wrapper">
      <div className="heroCategories">mkkoo</div>
    </div>
  );
};
