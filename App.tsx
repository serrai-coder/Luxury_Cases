
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Specifications from './components/Specifications';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';
import Faq from './components/Faq';
import type { OrderDetails } from './types';

const App: React.FC = () => {
  const [orderSubmitted, setOrderSubmitted] = useState<OrderDetails | null>(null);

  const handleOrderSuccess = useCallback((details: OrderDetails) => {
    setOrderSubmitted(details);
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = useCallback(() => {
    setOrderSubmitted(null);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header />
      <main>
        {orderSubmitted ? (
          <ThankYou orderDetails={orderSubmitted} onGoBack={handleGoBack} />
        ) : (
          <>
            <Hero />
            <Features />
            <Specifications />
            <Reviews />
            <Pricing />
            <Faq />
            <OrderForm onOrderSuccess={handleOrderSuccess} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
