import React, { useState } from "react";
import HeaderItems from "./HeaderItems";
import { FaMobileAlt } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";

import {
  HiHome,
  HiShoppingBag,
  HiSparkles,
  HiHomeModern,
  HiGift,
  HiShoppingCart,
} from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {

    const [toggle, setToggle] = useState(false);


    const menu = [
      {
        name: "Home",
        icon: HiHome,
      },
      {
        name: "Electronics",
        icon: FaMobileAlt,
      },
      {
        name: "Fashion",
        icon: HiShoppingBag,
      },
      {
        name: "Beauty & Personal Care",
        icon: HiSparkles,
      },
      {
        name: "Home & Kitchen",
        icon: HiHomeModern,
      },
      {
        name: "Sports & Fitness",
        icon: MdSportsTennis,
      },
      {
        name: "Toys & Baby Products",
        icon: HiGift,
      },
      {
        name: "Grocery",
        icon: HiShoppingCart,
      },
     
    ];
    
  return (
    <>
      <div className="flex items-center  gap-8 justify-between p-5">
        <div className="flex items-center gap-5  ">
          <div className="hidden md:flex gap-8">
            {menu.map((item, index) => (
              <HeaderItems key={index} name={item.name} Icon={item.icon} />
            ))}
          </div>

          <div className="md:hidden flex gap-8">
            {menu.map(
              (item, index) =>
                index < 3 && <HeaderItems name={""} Icon={item.icon} />
            )}

           <div className="md:hidden  " onClick={()=>setToggle(!toggle)}>
              <HeaderItems name={""} Icon={BsThreeDotsVertical} />
              {toggle? <div className="z-50 absolute mt-3 bg-[#121212] border-[1px] p-3  hover:underline-offset-8">
                {menu.map(
                  (item, index) =>
                    index >= 3 && (
                      <HeaderItems key={index} name={item.name} Icon={item.icon} />
                    )
                )}
              </div>:null}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Header;
