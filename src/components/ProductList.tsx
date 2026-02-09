import { useState } from 'react';
import { Plus, ChevronRight, Trash2, Search, Package, List, Home } from 'lucide-react';
import { Product } from '../App';
import { AddProductModal } from './AddProductModal';
import { FeedView } from './FeedView';

interface ProductListProps {
  products: Product[];
  onAddProduct: (id: string, name: string, category: string) => void;
  onRemoveProduct: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onShowCatalog: () => void;
}

export function ProductList({ 
  products, 
  onAddProduct, 
  onRemoveProduct, 
  onSelectProduct,
  onShowCatalog
}: ProductListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'feed' | 'manage' | 'catalog'>('feed');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Feed View */}
      {view === 'feed' && (
        <div className="max-w-2xl mx-auto">
          {/* Simple Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-4">
              <h1 className="text-2xl font-semibold">Dream Your Life</h1>
            </div>
          </div>

          <div className="px-4 py-6">
            {products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No products yet</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setView('catalog')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    Browse Dream Items
                  </button>
                </div>
              </div>
            ) : (
              <FeedView products={products} onProductClick={onSelectProduct} />
            )}
          </div>
        </div>
      )}

      {/* Catalog View */}
      {view === 'catalog' && (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-4">
              <h1 className="text-2xl font-semibold mb-4">Dream Items</h1>
              <button
                onClick={onShowCatalog}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Browse Full Catalog</span>
                </div>
              </button>
            </div>
          </div>

          <div className="px-4 py-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Package className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Products</h3>
              <p className="text-gray-500 mb-4">
                Browse our curated catalog of dream items including vehicles, watches, and more
              </p>
              <button
                onClick={onShowCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Package className="w-5 h-5" />
                Open Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage View */}
      {view === 'manage' && (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Manage</h1>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Product Count */}
          <div className="px-4 py-4">
            <p className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'product' : 'products'} tracked
            </p>
          </div>

          {/* Product List */}
          <div className="px-4 pb-8">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchQuery ? 'No products found' : 'No products yet'}
                </p>
                {!searchQuery && (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setView('catalog')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      Browse Dream Items
                    </button>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Add Custom Product
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => onSelectProduct(product)}
                    onRemove={() => onRemoveProduct(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar - Instagram Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setView('feed')}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <Home className={`w-7 h-7 ${view === 'feed' ? 'text-gray-900' : 'text-gray-400'}`} />
              <span className={`text-xs ${view === 'feed' ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                Feed
              </span>
            </button>
            
            <button
              onClick={() => setView('catalog')}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <Package className={`w-7 h-7 ${view === 'catalog' ? 'text-gray-900' : 'text-gray-400'}`} />
              <span className={`text-xs ${view === 'catalog' ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                Discover
              </span>
            </button>

            <button
              onClick={() => setView('manage')}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <List className={`w-7 h-7 ${view === 'manage' ? 'text-gray-900' : 'text-gray-400'}`} />
              <span className={`text-xs ${view === 'manage' ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                Manage
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddProduct}
      />
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  onRemove: () => void;
}

function ProductCard({ product, onSelect, onRemove }: ProductCardProps) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        onClick={onSelect}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">
              {product.category}
            </span>
            <span>•</span>
            <span>Added {formatDate(product.addedAt)}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </button>
      
      {/* Delete Button */}
      {showDelete && (
        <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Remove "${product.name}" from your tracked products?`)) {
                onRemove();
              }
            }}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Unsubscribe
          </button>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}