import { ThumbsUp, Eye } from 'lucide-react';
import { Product } from '../App';
import { productPool } from '../data/productPool';
import { useEffect } from 'react';

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

    // Add TikTok videos for each product
    feedItems.push(
      {
        id: `${product.id}-tiktok-1`,
        type: 'tiktok',
        product: product,
        videoId: '7603573142132509983',
        author: '@jimmyxcooks',
        url: 'https://www.tiktok.com/@jimmyxcooks/video/7603573142132509983'
      }
    );
  });

  // Shuffle the feed items to mix videos and photos
  return feedItems.sort(() => Math.random() - 0.5);
};

type FeedItem = VideoFeedItem | TikTokFeedItem;

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

interface TikTokFeedItem {
  id: string;
  type: 'tiktok';
  product: Product;
  videoId: string;
  author: string;
  url: string;
}

export function FeedView({ products, onProductClick }: FeedViewProps) {
  const feedItems = generateFeedItems(products);

  useEffect(() => {
    // Load TikTok embed script
    const tiktokScript = document.createElement('script');
    tiktokScript.src = 'https://www.tiktok.com/embed.js';
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);

    return () => {
      if (document.body.contains(tiktokScript)) {
        document.body.removeChild(tiktokScript);
      }
    };
  }, []);

  if (feedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content yet. Subscribe to products to see their feed!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems.map(item => {
        if (item.type === 'video') {
          return <VideoFeedCard key={item.id} item={item} onProductClick={onProductClick} />;
        } else {
          return <TikTokFeedCard key={item.id} item={item} onProductClick={onProductClick} />;
        }
      })}
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

function TikTokFeedCard({ item, onProductClick }: { item: TikTokFeedItem; onProductClick: (product: Product) => void }) {
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

      {/* TikTok Embed */}
      <div className="flex justify-center">
        <blockquote
          className="tiktok-embed"
          cite={item.url}
          data-video-id={item.videoId}
          style={{ maxWidth: '100%', minWidth: '100%', margin: 0 }}
        >
          <section>
            <a
              target="_blank"
              title={item.author}
              href={`${item.url}?refer=embed`}
              rel="noopener noreferrer"
            >
              {item.author}
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  );
}
