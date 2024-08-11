import React from 'react';
import { useSelector } from 'react-redux';
import HeroSection from '../components/HeroSection';
import PropertiesSection from '../components/PropertiesSection';

const HomePage = () => {
  const user = useSelector(state => state.user); // Assuming you're using Redux to manage state
  return (
    <div>
      <section>
        <HeroSection user={user} />
      </section>

      <section id='properties' className='mt-10'>
        <PropertiesSection />
      </section>
    </div>
  );
};

export default HomePage;
