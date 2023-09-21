import React from "react";
import s from "./Home.module.css";
import Cards from "../cards/Cards";
import Banner from "../banner/Banner";
import Info from "../info/Info";
import Footer from "../footer/Footer";
import Categories from "../categories/categories";

function Home() {
  return (
    <div className={s.container}>
      <Banner />
      <Info />
      <Categories />
      <Cards />
      <Footer />
     </div>
  );
}


export default Home; 
      
    