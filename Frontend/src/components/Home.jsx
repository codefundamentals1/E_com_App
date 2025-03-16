import React from 'react'
import GenreItemList from './GenreItemList'
import Slider from './Slider'
import Downloadpage from './Downloadpage'

const Home = () => {
  return (
<><Slider></Slider>
<GenreItemList></GenreItemList>
<hr />
<Downloadpage></Downloadpage>
</>
    
  )
}

export default Home