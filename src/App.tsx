import { useState } from 'react';
import { ProductList } from './components/ProductList';
import { ProductInsights } from './components/ProductInsights';
import { ProductCatalog } from './components/ProductCatalog';

export interface Product {
  id: string;
  name: string;
  category: string;
  addedAt: Date;
}

type View = 'list' | 'catalog' | 'insights';

export default function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'toyota-4runner-trd-pro',
      name: 'Toyota 4Runner TRD Pro',
      category: 'Vehicles',
      addedAt: new Date('2024-01-15')
    }
  ]);

  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = (id: string, name: string, category: string) => {
    const newProduct: Product = {
      id,
      name,
      category,
      addedAt: new Date()
    };
    setProducts([newProduct, ...products]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setCurrentView('list');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('insights');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  const handleShowCatalog = () => {
    setCurrentView('catalog');
  };

  const handleSubscribeFromCatalog = (id: string, name: string, category: string) => {
    // Check if already subscribed
    if (!products.find(p => p.id === id)) {
      handleAddProduct(id, name, category);
    }
    setCurrentView('list');
  };

  const isProductSubscribed = (id: string) => {
    return products.some(p => p.id === id);
  };

  if (currentView === 'catalog') {
    return (
      <ProductCatalog
        onBack={handleBackToList}
        onSubscribe={handleSubscribeFromCatalog}
        subscribedProductIds={products.map(p => p.id)}
      />
    );
  }

  if (currentView === 'insights' && selectedProduct) {
    return (
      <ProductInsights 
        product={selectedProduct}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <ProductList
      products={products}
      onAddProduct={handleAddProduct}
      onRemoveProduct={handleRemoveProduct}
      onSelectProduct={handleSelectProduct}
      onShowCatalog={handleShowCatalog}
    />
  );
}
