import { MorePay } from '@/components/pages/MorePay';
import { MostViewed } from '@/components/pages/MostViewed';
import { AppleCardsCarousel } from '@/components/pages/NewJobs';
import Carousel from '@/components/parts/Carousel';

import React from 'react';

const Home = async () => {
  return (
    <div className='example'>
      <Carousel/>
      <MostViewed/>
      <AppleCardsCarousel/>
      <MorePay/>
    </div>
  )
}

export default Home
