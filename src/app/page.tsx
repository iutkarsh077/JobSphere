import { AppleCardsCarousel } from '@/components/pages/NewJobs';
import Carousel from '@/components/parts/Carousel';

import React from 'react';

const Home = async () => {
  return (
    <div className='example'>
      <Carousel/>
      <AppleCardsCarousel/>
    </div>
  )
}

export default Home
