import { ThumbsUp, Eye, Heart, ExternalLink } from 'lucide-react';
import { Product } from '../App';
import { productPool } from '../data/productPool';

interface FeedViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// Generate feed items from productPool data
const generateFeedItems = (products: Product[]) => {
  const feedItems: FeedItem[] = [];
  
  products.forEach(product => {
    // Find product in pool to get videos
    const poolProduct = productPool.find(p => p.id === product.id || p.name === product.name);
    
    // Add videos from productPool if they exist
    if (poolProduct?.videos) {
      poolProduct.videos.forEach(video => {
        feedItems.push({
          id: `${product.id}-video-${video.id}`,
          type: 'video',
          product: product,
          videoId: video.videoId,
          title: video.title,
          channel: video.channel,
          views: video.views,
          likes: video.likes,
          uploadedAt: video.uploadedAt
        });
      });
    }

    // Add some photos for each product
    feedItems.push(
      {
        id: `${product.id}-photo-1`,
        type: 'photo',
        product: product,
        url: 'luxury product lifestyle',
        source: 'Instagram',
        author: '@luxury_lifestyle',
        likes: 12400
      },
      {
        id: `${product.id}-photo-2`,
        type: 'photo',
        product: product,
        url: 'product detail shot',
        source: 'Instagram',
        author: '@product_enthusiast',
        likes: 8900
      }
    );
  });

  // Shuffle the feed items to mix videos and photos
  return feedItems.sort(() => Math.random() - 0.5);
};

type FeedItem = VideoFeedItem | PhotoFeedItem;

interface VideoFeedItem {
  id: string;
  type: 'video';
  product: Product;
  videoId: string;
  title: string;
  channel: string;
  views: string;
  likes: string;
  uploadedAt: string;
}

interface PhotoFeedItem {
  id: string;
  type: 'photo';
  product: Product;
  url: string;
  source: string;
  author: string;
  likes: number;
}

export function FeedView({ products, onProductClick }: FeedViewProps) {
  const feedItems = generateFeedItems(products);

  if (feedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content yet. Subscribe to products to see their feed!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems.map(item => (
        item.type === 'video' ? (
          <VideoFeedCard key={item.id} item={item} onProductClick={onProductClick} />
        ) : (
          <PhotoFeedCard key={item.id} item={item} onProductClick={onProductClick} />
        )
      ))}
    </div>
  );
}

function VideoFeedCard({ item, onProductClick }: { item: VideoFeedItem; onProductClick: (product: Product) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Tag */}
      <div className="px-4 pt-3 pb-2">
        <button
          onClick={() => onProductClick(item.product)}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs">
            {item.product.category}
          </span>
          <span>{item.product.name}</span>
        </button>
      </div>

      {/* Video Embed */}
      <div className="relative aspect-video bg-gray-200">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${item.videoId}`}
          title={item.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{item.channel}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{item.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{item.likes}</span>
          </div>
          <span>• {item.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}

function PhotoFeedCard({ item, onProductClick }: { item: PhotoFeedItem; onProductClick: (product: Product) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Tag */}
      <div className="px-4 pt-3 pb-2">
        <button
          onClick={() => onProductClick(item.product)}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs">
            {item.product.category}
          </span>
          <span>{item.product.name}</span>
        </button>
      </div>

      {/* Photo */}
      <div className="relative aspect-square bg-gray-200">
        <img
          src={`https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80`}
          alt={`${item.source} post`}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <Heart className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* Photo Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{item.source}</span>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-700 font-medium mb-2">{item.author}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Heart className="w-4 h-4 fill-gray-400 text-gray-400" />
          <span>{(item.likes / 1000).toFixed(1)}K likes</span>
        </div>
      </div>
    </div>
  );
}
