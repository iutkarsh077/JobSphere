import { Navbar } from '@/components/pages/Navbar';
import { getCookie } from '@/helpers/getCookie';
import React from 'react';

const Navbar2 = async () => {
  const getUserDetails = await getCookie();
  return (
    <div className='example'>
      <Navbar UserDetails={getUserDetails}/>
    </div>
  )
}

export default Navbar2
