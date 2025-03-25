import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrItemCard from './HrItemCard';
import ItemCard from './ItemCard';

function ItemList({category ,index_}) {
    const [itemList,setitemList]=useState([])
console.log(category);

   

    const elementRef=useRef(null);
    useEffect(()=>{
        getitemBycategory();
    },[])

    const getitemBycategory=()=>{
        GlobalApi.getItemByCategory(category).then(resp=>{
            console.log("item list results ")
                console.log(resp.data.products)
                setitemList(resp.data.products)

 
        }
        
    )
    .catch(err => console.error(err));
    }

    



    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }
  return (
    <div className='relative'>
         <IoChevronBackOutline onClick={()=>slideLeft(elementRef.current)} 
         className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
            hidden md:block absolute
            ${index_%3==0?'mt-[80px]':'mt-[150px]'} `}/>
   
    <div ref={elementRef} className="scroll-my-0 flex overflow-x-auto overflow-y-hidden gap-8 
             scrollbar-none scroll-smooth pt-4 px-3">
     {itemList.map((item,index)=>(
           <>
          {<ItemCard item={item} />}
           </> 
        ))}
    </div>
    <IoChevronForwardOutline onClick={()=>slideRight(elementRef.current)}
           className={`text-[50px] text-white hidden md:block
           p-2 cursor-pointer z-10 top-0
            absolute right-0 
            ${index_%3==0?'mt-[80px]':'mt-[150px]'}`}/> 
    </div>
  )
}

export default ItemList