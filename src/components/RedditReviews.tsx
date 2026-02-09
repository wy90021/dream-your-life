import { MessageCircle, ArrowUp, Award } from 'lucide-react';

interface RedditReviewsProps {
  product: string;
}

// Mock Reddit review data
const mockRedditData = [
  {
    id: '1',
    title: 'After 2 years with my TRD Pro, here\'s my honest review',
    subreddit: 'r/4Runner',
    author: 'u/offroad_enthusiast',
    upvotes: 1245,
    comments: 187,
    timeAgo: '3 days ago',
    preview: 'I\'ve owned my 4Runner TRD Pro for 2 years now and put about 45k miles on it. Taken it on countless trails in Colorado, Utah, and Arizona. Here\'s what I love and what could be better...',
    awards: 3
  },
  {
    id: '2',
    title: 'TRD Pro vs TRD Off-Road - Is the Pro worth the extra $10k?',
    subreddit: 'r/Toyota',
    author: 'u/budget_buyer',
    upvotes: 892,
    comments: 156,
    timeAgo: '1 week ago',
    preview: 'I\'m in the market for a 4Runner and trying to decide between the TRD Off-Road and TRD Pro. The Pro looks amazing but is it really worth the premium? Let me break down the differences...',
    awards: 1
  },
  {
    id: '3',
    title: 'Just completed a 3000 mile overland trip in my TRD Pro. AMA!',
    subreddit: 'r/Overlanding',
    author: 'u/adventure_seeker',
    upvotes: 2156,
    comments: 284,
    timeAgo: '5 days ago',
    preview: 'Just finished an epic 3000 mile journey from Seattle to Baja California in my 4Runner TRD Pro. The truck performed flawlessly. Happy to answer any questions about the build, mods, or the journey!',
    awards: 7
  },
  {
    id: '4',
    title: 'Real world MPG with the TRD Pro - What to expect',
    subreddit: 'r/4Runner',
    author: 'u/mpg_tracker',
    upvotes: 634,
    comments: 92,
    timeAgo: '2 weeks ago',
    preview: 'Seeing a lot of questions about fuel economy. I\'ve been meticulously tracking my MPG for the past year. Here are my averages: City: 16.2 MPG, Highway: 19.8 MPG, Mixed: 17.5 MPG...',
    awards: 2
  },
  {
    id: '5',
    title: 'Why I sold my Jeep Wrangler for a 4Runner TRD Pro',
    subreddit: 'r/Toyota',
    author: 'u/jeep_convert',
    upvotes: 1567,
    comments: 341,
    timeAgo: '4 days ago',
    preview: 'After 5 years with a Wrangler Rubicon, I made the switch to a 4Runner TRD Pro. Here\'s why I don\'t regret it one bit. The reliability alone has been worth it...',
    awards: 5
  }
];

export function RedditReviews({ product }: RedditReviewsProps) {
  return (
    <div className="space-y-4">
      {mockRedditData.map((post) => (
        <RedditCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function RedditCard({ post }: { post: typeof mockRedditData[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        {/* Upvote section */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <button className="text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-gray-700">{post.upvotes}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-semibold text-blue-600">{post.subreddit}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">Posted by {post.author}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{post.timeAgo}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{post.title}</h3>
          
          {post.awards > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: Math.min(post.awards, 3) }).map((_, i) => (
                <Award key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          )}

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.preview}</p>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} comments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
