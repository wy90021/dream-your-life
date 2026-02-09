import { useState } from 'react';
import { PlaySquare, MessageSquare, ChevronLeft } from 'lucide-react';
import { Product } from '../App';
import { MediaSection } from './MediaSection';
import { RedditReviews } from './RedditReviews';

interface ProductInsightsProps {
  product: Product;
  onBack: () => void;
}

export function ProductInsights({ product, onBack }: ProductInsightsProps) {
  const [activeTab, setActiveTab] = useState<'media' | 'reddit'>('media');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* iOS-style Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 pt-12 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-semibold mb-1">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
              activeTab === 'media'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <PlaySquare className="w-4 h-4" />
            <span className="text-sm font-medium">Videos & Photos</span>
          </button>
          <button
            onClick={() => setActiveTab('reddit')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
              activeTab === 'reddit'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Reddit</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        {activeTab === 'media' && <MediaSection product={product.name} />}
        {activeTab === 'reddit' && <RedditReviews product={product.name} />}
      </div>
    </div>
  );
}