import { Play, ThumbsUp, Eye } from 'lucide-react';

interface YouTubeReviewsProps {
  product: string;
}

// Mock YouTube review data
const mockYouTubeData = [
  {
    id: '1',
    title: '2024 Toyota 4Runner TRD Pro - The ULTIMATE Off-Road SUV!',
    channel: 'TheStraightPipes',
    thumbnail: 'toyota 4runner red mountain',
    views: '1.2M',
    likes: '45K',
    duration: '18:42',
    uploadedAt: '2 weeks ago'
  },
  {
    id: '2',
    title: 'Toyota 4Runner TRD Pro Review: Worth the Price?',
    channel: 'Throttle House',
    thumbnail: 'toyota 4runner desert offroad',
    views: '856K',
    likes: '32K',
    duration: '15:20',
    uploadedAt: '1 month ago'
  },
  {
    id: '3',
    title: 'Living with the 4Runner TRD Pro - 6 Month Review',
    channel: 'TFL Truck',
    thumbnail: 'toyota 4runner trails',
    views: '624K',
    likes: '28K',
    duration: '22:15',
    uploadedAt: '3 weeks ago'
  },
  {
    id: '4',
    title: '4Runner TRD Pro vs Jeep Wrangler Rubicon - Off-Road Battle!',
    channel: 'MotorTrend',
    thumbnail: 'toyota 4runner rocks',
    views: '2.1M',
    likes: '67K',
    duration: '25:30',
    uploadedAt: '1 week ago'
  },
  {
    id: '5',
    title: 'Why the 4Runner TRD Pro is PERFECT for Overlanding',
    channel: 'Expedition Overland',
    thumbnail: 'toyota 4runner camping',
    views: '445K',
    likes: '19K',
    duration: '12:45',
    uploadedAt: '2 months ago'
  }
];

export function YouTubeReviews({ product }: YouTubeReviewsProps) {
  return (
    <div className="space-y-4">
      {mockYouTubeData.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoCard({ video }: { video: typeof mockYouTubeData[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-gray-200">
        <img
          src={`https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{video.channel}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{video.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{video.likes}</span>
          </div>
          <span>• {video.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}
