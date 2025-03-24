import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import GlobalApi from "../Services/GlobalApi";
const screenwidth = window.innerWidth;
import carousel from '../assets/Images/carousel.jpg'
const Slider = () => {
    const elementref = useRef();
 

  const sliderLeft = (element)=>{
    element.scrollLeft-=screenwidth-110;

  }
  const sliderRight = (element)=>{
    element.scrollLeft+=screenwidth-110;

  }

  return (
    <>
    <div>
    <FaChevronLeft className=" hidden md:block text-white text-[30px] mx-8 mt-[150px] absolute cursor-pointer" onClick={()=>sliderLeft(elementref.current)}/>
    <FaChevronRight className=" hidden md:block text-white text-[30px] mx-8 mt-[150px] absolute cursor-pointer right-0" onClick={()=>sliderRight(elementref.current)}/>

    <div className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth" ref={elementref}>
    {[1,2,3,4,5].map((item, index)=>(
        <img key={index} src={carousel} alt="" 
        className='min-w-full md:h-[230px] object-cover object-left-top mr-5 rounded-lg hover:border-[4px] transition-all duration-150 ease-in border-gray-300 ' />

    ))}
    </div>
    </div>
    </>
  )
};

export default Slider;
