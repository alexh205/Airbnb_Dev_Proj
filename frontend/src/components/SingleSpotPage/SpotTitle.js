import './SpotDetail.css'

const SpotTitle = ({ spot, reviewsArr }) => {
  return (
    <div className="spotTitle-container">
      <div className="spotName">{spot.name}</div>
      <div className="lowerTitle">
        {spot && (
          <div className="reviewStar">

              {" "}
              ⭐{spot.avgRating}· {reviewsArr.length} reviews

          </div>
        )}
        <div className="location">
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div className="price">${spot.price} night</div>
      </div>
    </div>
  );
};
export default SpotTitle;
