import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, User } from 'lucide-react';
import { Review } from '../types';

interface EnhancedReviewProps {
  review: Review;
  onHelpfulVote: (reviewId: string, helpful: boolean) => void;
}

const EnhancedReview: React.FC<EnhancedReviewProps> = ({ review, onHelpfulVote }) => {
  const [hasVoted, setHasVoted] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleHelpfulClick = (helpful: boolean) => {
    if (!hasVoted) {
      setHasVoted(helpful ? 'helpful' : 'not-helpful');
      onHelpfulVote(review.id, helpful);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const isVerifiedPurchase = Math.random() > 0.5; // Simulate verified purchase

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-900">{review.userName}</p>
              {isVerifiedPurchase && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
            </div>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600">
          <Flag className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-13">
        <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
        
        {/* Review Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Helpful?</span>
            <button
              onClick={() => handleHelpfulClick(true)}
              disabled={hasVoted !== null}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-colors ${
                hasVoted === 'helpful'
                  ? 'bg-green-100 text-green-700'
                  : hasVoted === 'not-helpful'
                  ? 'text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>Yes ({review.helpful})</span>
            </button>
            <button
              onClick={() => handleHelpfulClick(false)}
              disabled={hasVoted !== null}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-colors ${
                hasVoted === 'not-helpful'
                  ? 'bg-red-100 text-red-700'
                  : hasVoted === 'helpful'
                  ? 'text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsDown className="h-3 w-3" />
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedReview;
