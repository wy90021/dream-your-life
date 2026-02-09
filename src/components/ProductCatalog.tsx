import { useState } from 'react';
import { ChevronLeft, Search, Check, Plus } from 'lucide-react';
import { productPool, PoolProduct } from '../data/productPool';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCatalogProps {
  onBack: () => void;
  onSubscribe: (id: string, name: string, category: string) => void;
  subscribedProductIds: string[];
}

export function ProductCatalog({ onBack, onSubscribe, subscribedProductIds }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(productPool.map(p => p.category)))];

  const filteredProducts = productPool.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 pt-12 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-semibold mb-4">Dream Items</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or tags..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
        </p>

        <div className="space-y-4">
          {filteredProducts.map(product => (
            <CatalogProductCard
              key={product.id}
              product={product}
              isSubscribed={subscribedProductIds.includes(product.id)}
              onSubscribe={() => onSubscribe(product.id, product.name, product.category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CatalogProductCardProps {
  product: PoolProduct;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

function CatalogProductCard({ product, isSubscribed, onSubscribe }: CatalogProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Product Image */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=200&q=80`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={onSubscribe}
            disabled={isSubscribed}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isSubscribed
                ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
            }`}
          >
            {isSubscribed ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                Subscribed
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" />
                Subscribe
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}