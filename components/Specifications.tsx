
import React from 'react';

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start p-4 border-b border-gray-100">
        <div className="flex-shrink-0 text-yellow-500">{icon}</div>
        <div className="mr-4">
            <dt className="font-bold text-gray-800">{label}</dt>
            <dd className="text-gray-600">{value}</dd>
        </div>
    </div>
);

const Specifications: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">المواصفات التقنية</h2>
                <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-lg p-4">
                    <dl>
                        <SpecItem
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                            label="المواد المستخدمة"
                            value="جلد صناعي فاخر عالي الجودة مع هيكل داخلي من البولي كربونات لحماية قصوى."
                        />
                        <SpecItem
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                            label="التوافق"
                            value="مصمم خصيصاً لهاتف iPhone 13 Pro Max. (غير متوافق مع الموديلات الأخرى)."
                        />
                        <SpecItem
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
                            label="الألوان المتوفرة"
                            value="أسود كلاسيكي، وبني أنيق."
                        />
                        <SpecItem
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            label="مميزات إضافية"
                            value="محفظة مدمجة تتسع لبطاقتين، حزام كتف أنيق قابل للفصل والتعديل."
                        />
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default Specifications;
