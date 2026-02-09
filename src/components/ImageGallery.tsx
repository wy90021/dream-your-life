import { Heart, Download, ExternalLink } from 'lucide-react';

interface ImageGalleryProps {
  product: string;
}

// Mock image data
const mockImageData = [
  {
    id: '1',
    url: 'toyota 4runner sunset mountain',
    source: 'Instagram',
    author: '@offroad_adventures',
    likes: 12400
  },
  {
    id: '2',
    url: 'toyota 4runner snow',
    source: 'Instagram',
    author: '@trd_lifestyle',
    likes: 8900
  },
  {
    id: '3',
    url: 'toyota 4runner desert dunes',
    source: 'Flickr',
    author: '@overlanding_pics',
    likes: 5600
  },
  {
    id: '4',
    url: 'toyota 4runner forest trail',
    source: 'Instagram',
    author: '@toyota_nation',
    likes: 15200
  },
  {
    id: '5',
    url: 'toyota 4runner beach sunset',
    source: 'Instagram',
    author: '@adventure_ready',
    likes: 9800
  },
  {
    id: '6',
    url: 'toyota 4runner city night',
    source: 'Instagram',
    author: '@urban_explorer',
    likes: 7300
  }
];

export function ImageGallery({ product }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mockImageData.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}

function ImageCard({ image }: { image: typeof mockImageData[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-200">
        <img
          src={`https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80`}
          alt={`${image.source} post`}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <Heart className="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600">{image.source}</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </div>
        <p className="text-sm text-gray-700 font-medium mb-1">{image.author}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Heart className="w-3 h-3 fill-gray-400 text-gray-400" />
          <span>{(image.likes / 1000).toFixed(1)}K likes</span>
        </div>
      </div>
    </div>
  );
}
