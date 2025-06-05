import React from 'react';
import { CreditCard } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">الاشتراكات</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">الباقة الأساسية</h2>
            <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm text-gray-600">/شهرياً</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">✓ ميزة أساسية 1</li>
              <li className="flex items-center gap-2">✓ ميزة أساسية 2</li>
              <li className="flex items-center gap-2">✓ ميزة أساسية 3</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              اشترك الآن
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-500">
            <h2 className="text-xl font-semibold mb-4">الباقة المتقدمة</h2>
            <p className="text-3xl font-bold mb-4">$19.99<span className="text-sm text-gray-600">/شهرياً</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">✓ جميع المميزات الأساسية</li>
              <li className="flex items-center gap-2">✓ ميزة متقدمة 1</li>
              <li className="flex items-center gap-2">✓ ميزة متقدمة 2</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              اشترك الآن
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">الباقة الاحترافية</h2>
            <p className="text-3xl font-bold mb-4">$29.99<span className="text-sm text-gray-600">/شهرياً</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">✓ جميع المميزات المتقدمة</li>
              <li className="flex items-center gap-2">✓ ميزة احترافية 1</li>
              <li className="flex items-center gap-2">✓ ميزة احترافية 2</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              اشترك الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}