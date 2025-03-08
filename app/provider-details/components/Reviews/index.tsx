import WhitePaper from "@/components/ui/white-paper";
import React from "react";

const reviews = [
  {
    id: 1,
    name: "William Quarry",
    rating: 5,
    avatar: "https://placehold.co/20", // Replace with actual image
    review:
      "Great job! Booked a deep clean done on time with amazing skills. Very satisfied, showed on time, the fee was budget-friendly.",
  },
  {
    id: 2,
    name: "Joyce",
    rating: 3,
    avatar: "https://placehold.co/20", // Replace with actual image
    review:
      "Great job! Booked a deep clean done on time with amazing skills. Very satisfied, showed on time, the fee was budget-friendly.",
  },
  {
    id: 3,
    name: "Mac",
    rating: 4,
    avatar: "https://placehold.co/20", // Replace with actual image
    review:
      "Great job! Booked a deep clean done on time with amazing skills. Very satisfied, showed on time, the fee was budget-friendly.",
  },
];

const Reviews = () => {
  return (
    <WhitePaper>
      <div>
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-800">Reviews</h3>

        {/* Overall Rating */}
        <div className="flex items-center text-yellow-500 mt-1">
          {"★★★★★".split("").map((star, index) => (
            <span key={index}>⭐</span>
          ))}
          <span className="text-gray-600 text-sm ml-2">(18) 4.3 out of 5</span>
        </div>

        {/* Top Reviews */}
        <h4 className="mt-3 font-semibold text-gray-800">Top reviews</h4>
        <div className="mt-2">
          {reviews.map((review) => (
            <div key={review.id} className="py-3">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">{review.name}</span>
              </div>

              {/* Star Rating */}
              <div className="text-yellow-500 text-sm mt-1">
                {"★★★★★".split("").map((star, index) => (
                  <span
                    key={index}
                    className={
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-600 mt-2">{review.review}</p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg mt-4">
          View all
        </button>
      </div>
    </WhitePaper>
  );
};

export default Reviews;
