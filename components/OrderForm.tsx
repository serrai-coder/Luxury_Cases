import React, { useState, useMemo, useEffect } from 'react';
import { wilayasData } from '../data/wilayas';
import type { Wilaya, OrderDetails } from '../types';
import { DeliveryType } from '../types';

interface OrderFormProps {
  onOrderSuccess: (details: OrderDetails) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneModel, setPhoneModel] = useState('iPhone 13 Pro Max');
  const [selectedWilayaId, setSelectedWilayaId] = useState('');
  const [selectedBaladiyaId, setSelectedBaladiyaId] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(DeliveryType.Home);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const selectedWilaya = useMemo<Wilaya | undefined>(() => 
    wilayasData.find(w => w.id === parseInt(selectedWilayaId, 10)),
    [selectedWilayaId]
  );
  
  useEffect(() => {
    setSelectedBaladiyaId('');
  }, [selectedWilayaId]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = 'الاسم مطلوب.';
    if (!lastName.trim()) newErrors.lastName = 'اللقب مطلوب.';
    if (!phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب.';
    } else if (!/^0[567]\d{8}$/.test(phone)) {
      newErrors.phone = 'الرجاء إدخال رقم هاتف صحيح (10 أرقام يبدأ بـ 05, 06 أو 07).';
    }
    if (!selectedWilayaId) newErrors.wilaya = 'الرجاء اختيار الولاية.';
    if (!selectedBaladiyaId) newErrors.baladiya = 'الرجاء اختيار البلدية.';
    if (!phoneModel) newErrors.phoneModel = 'الرجاء اختيار نوع الهاتف.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const getDeliveryPrice = (type: DeliveryType): number | string => {
      if (!selectedWilaya) return 0;
      if (type === DeliveryType.Home) {
          return selectedWilaya.deliveryPriceHome ?? 'غير متوفر';
      }
      return selectedWilaya.deliveryPriceStopDesk ?? 'غير متوفر';
  }

  const deliveryPrice = getDeliveryPrice(deliveryType);
  const productPrice = 3490;
  const totalPrice = typeof deliveryPrice === 'number' ? productPrice + deliveryPrice : productPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (typeof deliveryPrice !== 'number') {
        setErrors({ deliveryType: 'نوع التوصيل هذا غير متوفر في ولايتك.' });
        return;
    }

    setIsLoading(true);

    const selectedBaladiya = selectedWilaya?.cities.find(c => c.id === parseInt(selectedBaladiyaId, 10));

    const orderDetails: OrderDetails = {
      firstName,
      lastName,
      phone,
      phoneModel,
      wilaya: selectedWilaya?.name_ar || '',
      baladiya: selectedBaladiya?.name_ar || '',
      deliveryType: deliveryType === DeliveryType.Home ? 'توصيل للمنزل' : 'توصيل للمكتب',
      deliveryPrice,
      totalPrice,
    };

    // Simulate API call to a Google Sheets Web App
    // Replace WEB_APP_URL with your actual Google Apps Script URL
    //const WEB_APP_URL = 'https://script.google.com/macros/s/your-deployment-id/exec'; 
    
    try {    // --- بداية كود الربط مع Notion ---
    // تعليمات: استبدل القيم التالية بمعلومات Notion الخاصة بك
    const NOTION_API_KEY = 'ntn_I2933691805aKCkW3RFhge0qnsHHo7yWIsK7tS4Twt03go';
    const DATABASE_ID = '27e0aedc959d805abb70eeb64a366d09';

    // تحقق للتأكد من أنك قمت بتغيير القيم الافتراضية
    if (NOTION_API_KEY.startsWith('أدخل_') || DATABASE_ID.startsWith('أدخل_')) {
      setErrors({ submit: 'الرجاء إعداد مفتاح Notion API ومعرف قاعدة البيانات أولاً.' });
      setIsLoading(false);
      return;
    }
    
    // هذا الوسيط (Proxy) ضروري لتجاوز قيود CORS الأمنية في المتصفح
    // ملاحظة: هذا الحل غير آمن للاستخدام في موقع حقيقي ومنشور
    const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';
    const NOTION_API_URL = `${PROXY_URL}https://api.notion.com/v1/pages`;

    const notionPageData = {
      parent: { database_id: DATABASE_ID },
      properties: {
        'Nom': { title: [{ text: { content: orderDetails.firstName } }] },
        'Prenom': { rich_text: [{ text: { content: orderDetails.lastName } }] },
        'Numéro Tel': { phone_number: orderDetails.phone },
        'Wilaya': { select: { name: orderDetails.wilaya } },
        'Commune': { rich_text: [{ text: { content: orderDetails.baladiya } }] },
        'Produit': { rich_text: [{ text: { content: orderDetails.phoneModel } }] }, // تم الربط مع نوع الهاتف
        'Type de livraison': { select: { name: orderDetails.deliveryType } },
        'Prix': { number: orderDetails.totalPrice },
        'Date et Heure': { date: { start: new Date().toISOString() } },
        'Situation de commande': { select: { name: 'Nouveau' } },
      },
    };

    try {
      const response = await fetch(NOTION_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify(notionPageData),
      });

      if (!response.ok) {
        // إذا فشل الطلب، حاول قراءة رسالة الخطأ من Notion
        const errorData = await response.json();
        console.error('Notion API Error:', errorData);
        throw new Error(errorData.message || 'فشل الاتصال بواجهة Notion.');
      }

      console.log('Order submitted successfully to Notion', orderDetails);
      onOrderSuccess(orderDetails);

    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({ submit: 'حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.' });
    } finally {
      setIsLoading(false);
    }
    // --- نهاية كود الربط مع Notion ---
    }
  };

  return (
    <section id="order-form" className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">نموذج الطلب</h2>
          <p className="text-center text-gray-600 mb-8">املأ المعلومات التالية لتأكيد طلبك. سنتصل بك قريبًا.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-lg font-semibold text-gray-700 mb-2">الاسم</label>
                  <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" required />
                  {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-lg font-semibold text-gray-700 mb-2">اللقب</label>
                  <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" required />
                  {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">رقم الهاتف</label>
                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" required />
                {errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}
              </div>
               <div>
                <label htmlFor="phoneModel" className="block text-lg font-semibold text-gray-700 mb-2">نوع الهاتف</label>
                <select id="phoneModel" value={phoneModel} onChange={e => setPhoneModel(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-yellow-500 focus:border-yellow-500" required>
                  <option>iPhone 13 Pro Max</option>
                  <option>iPhone 14 Pro Max</option>
                  <option>iPhone 15 Pro Max</option>
                </select>
                {errors.phoneModel && <p className="text-red-500 mt-1">{errors.phoneModel}</p>}
              </div>
              <div>
                <label htmlFor="wilaya" className="block text-lg font-semibold text-gray-700 mb-2">الولاية</label>
                <select id="wilaya" value={selectedWilayaId} onChange={e => setSelectedWilayaId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-yellow-500 focus:border-yellow-500" required>
                  <option value="" disabled>-- اختر الولاية --</option>
                  {wilayasData.map(w => <option key={w.id} value={w.id}>{w.name_ar}</option>)}
                </select>
                {errors.wilaya && <p className="text-red-500 mt-1">{errors.wilaya}</p>}
              </div>
              <div>
                <label htmlFor="baladiya" className="block text-lg font-semibold text-gray-700 mb-2">البلدية</label>
                <select id="baladiya" value={selectedBaladiyaId} onChange={e => setSelectedBaladiyaId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-yellow-500 focus:border-yellow-500" disabled={!selectedWilaya} required>
                  <option value="" disabled>-- اختر البلدية --</option>
                  {selectedWilaya?.cities.map(c => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
                </select>
                {errors.baladiya && <p className="text-red-500 mt-1">{errors.baladiya}</p>}
              </div>
              <div>
                <span className="block text-lg font-semibold text-gray-700 mb-2">نوع التوصيل</span>
                <div className="space-y-2">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                        <input type="radio" name="deliveryType" value={DeliveryType.Home} checked={deliveryType === DeliveryType.Home} onChange={() => setDeliveryType(DeliveryType.Home)} className="h-5 w-5 text-yellow-600 focus:ring-yellow-500" />
                        <span className="mr-3 text-gray-800">توصيل للمنزل - <span className="font-bold">{getDeliveryPrice(DeliveryType.Home)} دج</span></span>
                    </label>
                     <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                        <input type="radio" name="deliveryType" value={DeliveryType.StopDesk} checked={deliveryType === DeliveryType.StopDesk} onChange={() => setDeliveryType(DeliveryType.StopDesk)} className="h-5 w-5 text-yellow-600 focus:ring-yellow-500" />
                        <span className="mr-3 text-gray-800">توصيل للمكتب - <span className="font-bold">{getDeliveryPrice(DeliveryType.StopDesk)} دج</span></span>
                    </label>
                </div>
                 {errors.deliveryType && <p className="text-red-500 mt-1">{errors.deliveryType}</p>}
              </div>
              <div className="border-t pt-4 text-center">
                 <p className="text-2xl font-bold">السعر الإجمالي: {totalPrice} دج</p>
              </div>
              {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}
              <button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-yellow-500 hover:text-black transition duration-300 shadow-lg flex items-center justify-center disabled:bg-gray-400">
                {isLoading ? (
                  <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>جاري التأكيد...</span>
                  </>
                ) : (
                  'أطلب الآن'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
