import { Star } from "lucide-react";
import { Rating } from "@/types";
import { format } from "date-fns";

interface RatingDisplayProps {
  ratings: Rating[];
  averageRating: number;
  totalReviews: number;
}

export default function RatingDisplay({
  ratings,
  averageRating,
  totalReviews,
}: RatingDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${averageRating >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <div>
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${rating.rating >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2">{rating.review}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(rating.createdAt), "PPP")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No reviews yet
          </div>
        )}
      </div>
    </div>
  );
}
