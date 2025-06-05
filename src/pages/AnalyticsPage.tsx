import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">تحليل البيانات</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">إحصائيات الاستخدام</h2>
            {/* Analytics content will go here */}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">التحليلات المتقدمة</h2>
            {/* More analytics content */}
          </div>
        </div>
      </div>
    </div>
  );
}