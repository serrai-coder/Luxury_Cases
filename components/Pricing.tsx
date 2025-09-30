
import React from 'react';
import Timer from './Timer';

const Pricing: React.FC = () => {
  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-yellow-400">عرض خاص ينتهي قريباً!</h3>
          <Timer />
          <p className="text-5xl font-bold my-4">
            <span className="line-through text-gray-400 text-3xl mr-3">4500 دج</span>
            <span>3490 دج</span>
          </p>
          <p className="text-lg">
            + تكاليف التوصيل. إستفد من التخفيض الآن!
          </p>
          <a 
            href="#order-form" 
            onClick={handleScrollToOrder}
            className="mt-6 inline-block bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition duration-300">
            أريد هذا العرض
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
