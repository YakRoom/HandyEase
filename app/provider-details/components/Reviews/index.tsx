import { FC } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui";
import WhitePaper from "@/components/ui/white-paper";
import defaultAvatar from "@/public/images/thumbnail.png";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  name: string;
  rating: number;
  avatar: string;
  review: string;
  date?: string;
}

interface ReviewsProps {
  reviews?: Review[];
  className?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "William Quarry",
    rating: 5,
    avatar: defaultAvatar,
    review: "Great job! Booked a deep clean done on time with amazing skills. Very satisfied, showed on time, the fee was budget-friendly.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    rating: 4,
    avatar: defaultAvatar,
    review: "Professional service and attention to detail. The plumbing work was completed efficiently. Would definitely recommend for any home repairs.",
    date: "1 month ago",
  }
];

const StarRating: FC<{ rating: number; size?: "sm" | "md" }> = ({ 
  rating,
  size = "sm"
}) => {
  return (
    <div className="flex items-center" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "fill-current",
            size === "sm" ? "w-4 h-4" : "w-5 h-5",
            index < rating 
              ? "text-yellow-400" 
              : "text-neutral-200"
          )}
        />
      ))}
    </div>
  );
};

const Reviews: FC<ReviewsProps> = ({ 
  reviews = mockReviews,
  className 
}) => {
  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  return (
    <WhitePaper className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Reviews
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={averageRating} size="md" />
            <span className="text-sm text-neutral-600">
              ({reviews.length}) {averageRating.toFixed(1)} out of 5
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-neutral-900 mb-4">
            Top reviews
          </h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <article 
                key={review.id}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={review.avatar}
                    alt={`${review.name}'s profile picture`}
                    className="rounded-full object-cover"
                    width={24}
                    height={24}
                  />
                  <div>
                    <h4 className="font-medium text-neutral-900">
                      {review.name}
                    </h4>
                    {review.date && (
                      <p className="text-xs text-neutral-500">
                        {review.date}
                      </p>
                    )}
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {review.review}
                </p>
              </article>
            ))}
          </div>
        </div>

        {reviews.length > 3 && (
          <Button
            variant="secondary"
            className="w-full"
          >
            View all reviews
          </Button>
        )}
      </div>
    </WhitePaper>
  );
};

export default Reviews;
