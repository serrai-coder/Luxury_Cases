
import React, { useState } from 'react';

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-right focus:outline-none"
            >
                <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
                <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-600 pr-2">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        {
            question: 'هل الغطاء متوافق مع جميع موديلات الهواتف؟',
            answer: 'حاليًا، التصميم متاح لموديلات iPhone 13 Pro Max, iPhone 14 Pro Max, و iPhone 15 Pro Max. يمكنك اختيار الموديل المناسب لك في نموذج الطلب.',
        },
        {
            question: 'كم يستغرق وقت التوصيل؟',
            answer: 'يستغرق التوصيل عادة بين 2 إلى 5 أيام عمل، ويعتمد ذلك على ولايتك وبعدها عن مركز التوزيع.',
        },
        {
            question: 'هل يمكنني إرجاع المنتج؟',
            answer: 'نعم، نوفر سياسة إرجاع في حال وجود أي عيب مصنعي في المنتج عند الاستلام. يرجى التواصل معنا فورًا في حال واجهت أي مشكلة.',
        },
        {
            question: 'ما هي المواد المصنوع منها الغطاء؟',
            answer: 'الغطاء مصنوع من جلد صناعي فاخر عالي الجودة، مع هيكل داخلي متين يوفر حماية ممتازة ضد الصدمات والخدوش.',
        },
    ];

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">أسئلة شائعة</h2>
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
