import React from 'react';
import type { OrderDetails } from '../types';

interface ThankYouProps {
    orderDetails: OrderDetails;
    onGoBack: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ orderDetails, onGoBack }) => {
    const whatsappMessage = `مرحباً، لقد قمت بطلب غطاء هاتف. هذا هو ملخص طلبي:
الاسم: ${orderDetails.firstName} ${orderDetails.lastName}
الهاتف: ${orderDetails.phone}
نوع الهاتف: ${orderDetails.phoneModel}
الولاية: ${orderDetails.wilaya}
البلدية: ${orderDetails.baladiya}
السعر الإجمالي: ${orderDetails.totalPrice} دج`;
    
    const whatsappUrl = `https://wa.me/213000000000?text=${encodeURIComponent(whatsappMessage)}`; // Replace with actual number

    return (
        <section className="flex items-center justify-center min-h-[70vh] py-20">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        شكراً لك! تم استلام طلبك بنجاح.
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        سنتصل بك على الرقم <span className="font-bold" dir="ltr">{orderDetails.phone}</span> خلال 24 ساعة لتأكيد الطلب.
                    </p>
                    <div className="border-t border-b border-gray-200 py-6 my-6 text-right space-y-3">
                        <h3 className="text-xl font-bold mb-4 text-center">ملخص الطلب</h3>
                        <p><strong>الاسم:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
                        <p><strong>الهاتف:</strong> {orderDetails.phone}</p>
                        <p><strong>نوع الهاتف:</strong> {orderDetails.phoneModel}</p>
                        <p><strong>الولاية:</strong> {orderDetails.wilaya}</p>
                        <p><strong>البلدية:</strong> {orderDetails.baladiya}</p>
                        <p><strong>نوع التوصيل:</strong> {orderDetails.deliveryType}</p>
                        <p className="text-2xl font-bold text-center mt-4">الإجمالي: {orderDetails.totalPrice} دج</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                         <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.885.002 2.024.603 3.962 1.698 5.617l-1.192 4.356 4.465-1.185z"/></svg>
                             <span>تواصل عبر واتساب</span>
                        </a>
                        <button 
                            onClick={onGoBack} 
                            className="w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-300 transition duration-300">
                            العودة للصفحة الرئيسية
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThankYou;