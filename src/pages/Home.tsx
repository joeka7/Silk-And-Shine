import { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Membership from '../components/Membership';
import Testimonials from '../components/Testimonials';
export default function Home() {
  useEffect(() => {
    document.title = 'Silk & Shine Club — Ultimate Hair Care Membership | Abu Dhabi';
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      <Services />
      <Membership />
      <Testimonials />
    </main>
  );
}
