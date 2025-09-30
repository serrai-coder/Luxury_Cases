
import React from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ReviewCard: React.FC<{ name: string; text: string; rating: number }> = ({ name, text, rating }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-4">
            {Array.from({ length: rating }).map((_, i) => (
                <StarIcon key={i} className="text-yellow-400" />
            ))}
        </div>
        <p className="text-gray-600 italic mb-4">"{text}"</p>
        <p className="font-bold text-right text-gray-800">- {name}</p>
    </div>
);

const Reviews: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">آراء عملائنا</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ReviewCard
                        name="فاطمة الزهراء .ع"
                        rating={5}
                        text="المنتج رائع والجودة ممتازة، تمامًا كما في الصور. التوصيل كان سريعًا أيضًا. شكرًا لكم!"
                    />
                    <ReviewCard
                        name="أمين .ل"
                        rating={5}
                        text="غطاء أنيق وعملي جدًا، أعجبتني فكرة المحفظة المدمجة. أنصح به بشدة."
                    />
                    <ReviewCard
                        name="محمد .س"
                        rating={5}
                        text="أفضل غطاء حماية اقتنيته على الإطلاق. التصميم فاخر والمواد المستخدمة عالية الجودة."
                    />
                </div>
            </div>
        </section>
    );
};

export default Reviews;
