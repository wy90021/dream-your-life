export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  views: string;
  likes: string;
  uploadedAt: string;
}

export interface PoolProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  imageQuery: string;
  tags: string[];
  videos?: YouTubeVideo[];
}

export const productPool: PoolProduct[] = [
  {
    id: 'toyota-4runner-trd-pro',
    name: 'Toyota 4Runner TRD Pro',
    category: 'Vehicles',
    description: 'Legendary off-road SUV with proven reliability and adventure-ready capability',
    imageQuery: 'toyota 4runner red mountain',
    tags: ['Off-Road', 'SUV', 'Adventure', 'Reliable'],
    videos: [
      {
        id: '1',
        videoId: 'kmtbk0siRIM',
        title: '2024 Toyota 4Runner TRD Pro - The ULTIMATE Off-Road SUV!',
        channel: 'TheStraightPipes',
        views: '1.2M',
        likes: '45K',
        uploadedAt: '2 weeks ago'
      },
      {
        id: '2',
        videoId: 'sCCs9eY03c8',
        title: 'Here\'s how Rolex Sea-Dweller SD43 wears on smaller wrists',
        channel: 'Hafiz J Mehmood',
        views: '134',
        likes: '1.7K',
        uploadedAt: '5 years ago'
      },
      {
        id: '3',
        videoId: 'j3Zomv68MFU',
        title: 'YouTube video',
        channel: 'YouTube',
        views: 'N/A',
        likes: 'N/A',
        uploadedAt: 'Recently'
      }
    ]
  },
  {
    id: 'bmw-m2',
    name: 'BMW M2',
    category: 'Vehicles',
    description: 'Pure driving machine with turbocharged performance and dynamic handling',
    imageQuery: 'bmw m2 blue racing',
    tags: ['Sports Car', 'Performance', 'Luxury', 'Track']
  },
  {
    id: 'patek-philippe-nautilus',
    name: 'Patek Philippe Nautilus',
    category: 'Watches',
    description: 'Iconic luxury sports watch with timeless design and exceptional craftsmanship',
    imageQuery: 'patek philippe nautilus luxury watch',
    tags: ['Luxury', 'Investment', 'Swiss', 'Iconic']
  },
  {
    id: 'patek-philippe-aquanaut',
    name: 'Patek Philippe Aquanaut',
    category: 'Watches',
    description: 'Contemporary sports watch combining elegance with casual sophistication',
    imageQuery: 'patek philippe aquanaut watch',
    tags: ['Luxury', 'Sports Watch', 'Swiss', 'Modern']
  },
  {
    id: 'rolex-submariner',
    name: 'Rolex Submariner',
    category: 'Watches',
    description: 'The ultimate dive watch and most recognized timepiece in the world',
    imageQuery: 'rolex submariner dive watch',
    tags: ['Dive Watch', 'Iconic', 'Investment', 'Swiss']
  },
  {
    id: 'rolex-daytona',
    name: 'Rolex Cosmograph Daytona',
    category: 'Watches',
    description: 'Legendary chronograph designed for racing drivers and collectors',
    imageQuery: 'rolex daytona chronograph',
    tags: ['Chronograph', 'Racing', 'Investment', 'Iconic']
  },
  {
    id: 'rolex-gmt-master-ii',
    name: 'Rolex GMT-Master II',
    category: 'Watches',
    description: 'Dual time zone watch favored by pilots and world travelers',
    imageQuery: 'rolex gmt master watch',
    tags: ['Travel', 'Pilot Watch', 'Iconic', 'Swiss']
  },
  {
    id: 'porsche-911-gt3',
    name: 'Porsche 911 GT3',
    category: 'Vehicles',
    description: 'Track-focused sports car with naturally aspirated engine perfection',
    imageQuery: 'porsche 911 gt3 racing',
    tags: ['Sports Car', 'Track', 'Performance', 'German']
  },
  {
    id: 'mercedes-g-wagon',
    name: 'Mercedes-Benz G-Class',
    category: 'Vehicles',
    description: 'Luxury SUV icon with unmatched off-road capability and presence',
    imageQuery: 'mercedes g wagon black luxury',
    tags: ['Luxury', 'SUV', 'Off-Road', 'Icon']
  },
  {
    id: 'range-rover-sport',
    name: 'Range Rover Sport',
    category: 'Vehicles',
    description: 'British luxury SUV combining refinement with dynamic performance',
    imageQuery: 'range rover sport luxury',
    tags: ['Luxury', 'SUV', 'British', 'Performance']
  },
  {
    id: 'audemars-piguet-royal-oak',
    name: 'Audemars Piguet Royal Oak',
    category: 'Watches',
    description: 'Revolutionary luxury sports watch that changed watchmaking forever',
    imageQuery: 'audemars piguet royal oak',
    tags: ['Luxury', 'Iconic', 'Swiss', 'Investment']
  },
  {
    id: 'omega-speedmaster',
    name: 'Omega Speedmaster Professional',
    category: 'Watches',
    description: 'The Moonwatch - first watch worn on the moon and space exploration icon',
    imageQuery: 'omega speedmaster moonwatch',
    tags: ['Moonwatch', 'Space', 'Chronograph', 'Swiss']
  }
];
