import React from 'react'
import { Link } from 'react-router-dom'

const HeaderItems = ({name , Icon,link}, onclick) => {
  return (
    <>
    <a href={'/'}>
    <div className='text-white flex items-center gap-3 font-semibold cursor-pointer hover:underline underline-offset-8 mb-2'>

        <Icon></Icon>
        <h2 className=''>{name}</h2>
    </div>
    </a>
    </>
  )
}

export default HeaderItems