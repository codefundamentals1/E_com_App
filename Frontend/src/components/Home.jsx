import React from 'react'
import GenreItemList from './GenreItemList'
import Slider from './Slider'
import Downloadpage from './Downloadpage'
import Landingpage1 from './LandingPage1'
import Landingpage2 from './Landingpage2'
import LifestyleCategories from './LifestyleCategories'

const Home = () => {
  return (
<>
<Slider></Slider>
<LifestyleCategories/>

<Landingpage2></Landingpage2>
<GenreItemList></GenreItemList>
<hr />
<Downloadpage></Downloadpage>
</>
    
  )
}

export default Home