
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/915162/pexels-photo-915162.jpeg" 
                alt="Luxury iPhone Case" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute top-4 left-4 bg-black text-white py-2 px-4 rounded-md shadow-lg transform -rotate-6">
                <span className="font-bold text-lg">موضة 2025</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              أضف لمسة من الفخامة لهاتفك
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              غطاء الحماية الفاخر المصمم خصيصًا لهاتف iPhone 13 Pro Max. يجمع بين الأناقة، الحماية الفائقة، والتصميم العملي مع محفظة مدمجة وحزام للكتف.
            </p>
            <a 
              href="#order-form" 
              onClick={handleScrollToOrder}
              className="mt-8 inline-block bg-gray-900 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-yellow-500 hover:text-black transition duration-300 shadow-lg">
              أطلب الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
