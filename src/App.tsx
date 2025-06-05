import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Image, BarChart3, CreditCard, ArrowRight } from 'lucide-react';
import ChatPage from './pages/ChatPage';
import GenerationPage from './pages/GenerationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SubscriptionPage from './pages/SubscriptionPage';

function App() {
  return (
    <Router>
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/generation" element={<GenerationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') return null;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
        <span>رجوع</span>
      </button>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      path: '/chat',
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'دردشة ذكية',
      description: 'تواصل مع نماذج الذكاء الاصطناعي المتقدمة'
    },
    {
      path: '/generation',
      icon: <Image className="w-8 h-8" />,
      title: 'توليد الصور',
      description: 'إنشاء صور مذهلة باستخدام الذكاء الاصطناعي'
    },
    {
      path: '/analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'تحليل البيانات',
      description: 'رؤى وتحليلات متقدمة لبياناتك'
    },
    {
      path: '/subscription',
      icon: <CreditCard className="w-8 h-8" />,
      title: 'نظام اشتراكات',
      description: 'خطط مرنة تناسب احتياجاتك'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          منصة الذكاء الاصطناعي المتكاملة
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <button
              key={feature.path}
              onClick={() => navigate(feature.path)}
              className="w-full text-right transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </button>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/chat"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-block"
          >
            ابدأ الآن
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;