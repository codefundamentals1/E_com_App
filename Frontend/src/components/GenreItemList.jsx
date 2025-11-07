//dummy oblect for just rendering the objects


import React from 'react'
import GenresList from '../Constants/GenresList'
import ItemList from './ItemList'
const GenreItemList = () => {
  return (
    <div>
        {GenresList.genere.map((item,index)=>(
            
                <div key={index} className='p-8 px-8 md:px-16'>
                    <h2 className='text-white text-[20px] font-bold '>{item.name}</h2>
                    <ItemList  category = {item.category}/>         
                </div>
        ))}

    </div>
  )
}

export default GenreItemList