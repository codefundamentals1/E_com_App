import React from "react";
import StarTemplate from "./StarTemplate";
//take a string of reviews  and 
const RatingBar = ({ reviews }) => {
  
  const ratingsCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  //total count if reviews
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingsCount[review.rating] += 1;
    }
  });

  
  const totalReviews = reviews.length;
//for each star it calculate the percentage review of this 
    const calculatePercentage = (count) => {
    return (count / totalReviews) * 100;
  };

  return (
   <div >
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto ">
      <div className="box flex  flex-col  justify-center gap-y-4 w-full ">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingsCount[rating];
          const percentage = calculatePercentage(count);

          return (
            <div key={rating} className="flex items-center w-full">
              <p className="font-medium text-lg text-black mr-0.5">{rating}</p>
              <StarTemplate />
              <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                {/* Dynamically width on %*/}
                <span
                  className="h-full rounded-3xl bg-amber-400 flex"
                  style={{ width: `${percentage}%` }}
                ></span>
              </p>
              <p className="font-medium text-lg text-black mr-0.5">{count}</p>
            </div>
          );
        })}
      </div>
      </div>
      </div>
    
  );
};

export default RatingBar;
