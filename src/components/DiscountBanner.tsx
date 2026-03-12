import React from 'react';
import { Tag, Clock, Zap } from 'lucide-react';

interface DiscountBannerProps {
  discountPercentage?: number;
  isFlashSale?: boolean;
  freeShipping?: boolean;
  endTime?: string;
}

const DiscountBanner: React.FC<DiscountBannerProps> = ({
  discountPercentage,
  isFlashSale = false,
  freeShipping = false,
  endTime
}) => {
  const getTimeRemaining = () => {
    if (!endTime) return null;
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m left`;
    }
    return 'Sale ended';
  };

  return (
    <div className="space-y-2">
      {discountPercentage && discountPercentage > 0 && (
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
          isFlashSale 
            ? 'bg-red-50 border border-red-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          {isFlashSale ? (
            <Zap className="h-4 w-4 text-red-600" />
          ) : (
            <Tag className="h-4 w-4 text-green-600" />
          )}
          <span className={`font-semibold text-sm ${
            isFlashSale ? 'text-red-700' : 'text-green-700'
          }`}>
            {isFlashSale ? 'Flash Sale!' : 'Special Offer!'} {discountPercentage}% OFF
          </span>
        </div>
      )}

      {isFlashSale && endTime && (
        <div className="flex items-center space-x-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
          <Clock className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-700">
            {getTimeRemaining()}
          </span>
        </div>
      )}

      {freeShipping && (
        <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <Tag className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            Free Shipping
          </span>
        </div>
      )}
    </div>
  );
};

export default DiscountBanner;
