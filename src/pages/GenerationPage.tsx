import React from 'react';
import { Image } from 'lucide-react';

export default function GenerationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Image className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">توليد الصور</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <textarea
            placeholder="صف الصورة التي تريد إنشاءها..."
            className="w-full h-32 border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            إنشاء الصورة
          </button>
          
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">الصور المنشأة</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Generated images will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}