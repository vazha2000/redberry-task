import React from "react";
import "./BlogPage.scss";
import { Navbar } from "../../components/Navbar";

export const BlogPage = () => {
  return (
    <>
      <Navbar />
      <div className="blogPage-wrapper">
        <div className="blogPage">
          <div className="blogPage__image">
            <img src="assets/images/test-cover.jpeg" alt="" />
          </div>
          <div className="blogPage__content">
            <h4>სახელი გვარი</h4>
            <header className="blogPage__content__info">
              <div className="blogPage-timeEmail">
                <p>12.12.2023 example@email.com</p>
              </div>
              <div className="blogPage-title">
                <h2>მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია</h2>
              </div>
              <ul className="blogPage__content__info__list">
                <li>koko</li>
                <li>koko</li>
                <li>koko</li>
              </ul>
            </header>
            <section>
              6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
              სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს
              მიენიჭა უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური
              ენერგია პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის
              ხელოვნების უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა
              თქმა უნდა, ეს ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების
              გამოსატანად. სანაცვლოდ, მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის
              სხვადასხვა მუსიკა მოასმენინონ რამდენიმე ყველს და უკვე ისინი
              შეაჯიბრონ ერთმანეთს. აქვე საგულისხმოა, რომ როგორც ბერნის
              მეცნიერები განმარტავენ, ექსპერიმენტს საფუძვლად არა ყველის
              გაუმჯობესებული წარმოება, არამედ კულტურული საკითხები დაედო. მათი
              თქმით, ადამიანებს უყვართ ყველი და მუსიკა, ამიტომაც საინტერესოა ამ
              ორის კავშირის დანახვა.
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
