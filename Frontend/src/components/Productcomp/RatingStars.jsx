const RatingStars = ({ rating }) => {
    // Ensure rating is between 0 and 5
    const filledStars = Math.floor(rating); // Whole filled stars
    const hasHalfStar = rating % 1 !== 0;  // If there's a half star
  
    // Create an array of stars to render (5 stars total)
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push('filled');
      } else if (i === filledStars && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
  
    return (
      <div style={{ display: 'flex' }}>
        {stars.map((star, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                fill={star === 'filled' ? '#FBBF24' : star === 'half' ? '#FBBF24' : '#e0e0e0'}
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="30" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ))}
      </div>
    );
  };
  
  export default RatingStars