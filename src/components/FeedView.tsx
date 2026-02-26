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
        author: '@bui_gtspec',
        likes: 12400,
        instagramUrl: 'https://www.instagram.com/reel/DNd-qFFy08h/',
        instagramEmbedId: 'DNd-qFFy08h'
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
  instagramUrl?: string;
  instagramEmbedId?: string;
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
      <div className="relative bg-gray-200">
        <a 
          href={item.instagramUrl || `https://www.instagram.com/reel/${item.instagramEmbedId}/`}
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full aspect-square relative group"
        >
          <img
            src={`https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80`}
            alt={`${item.source} post`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-4">
              <svg className="w-12 h-12 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-semibold text-sm">View on Instagram</p>
            <p className="text-white/80 text-xs">{item.author}</p>
          </div>
        </a>
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
