import React from 'react'

function HrItemCard({item}) {
  return (
    <section className='hover:scale-110 transition-all duration-150 ease-in'>
    <img src={item.images[0]} 
    className='w-[110px] md:w-[260px] rounded-lg
    hover:border-[3px] border-gray-400 cursor-pointer
    '/>
    <h2 className='w-[110px] md:w-[260px] text-white
    mt-2'>{item.title}</h2>
    </section>
  )
}

export default HrItemCard