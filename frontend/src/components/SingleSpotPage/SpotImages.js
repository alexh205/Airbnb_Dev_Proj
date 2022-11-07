import "./SpotDetail.css";

const SingleSpotImages = ({ spot }) => {
  let previewImg = { id: spot.id, url: spot.previewImage };
  let images = [previewImg, ...spot.spotImages];

  if (!images || images.length === 0)
    return <p style={{ fontStyle: "italic" }}>No images to display</p>;
  return (
    <div className="overall-img-container">
      {images.length > 1 && images.length < 5 ? (
        images.map((img, i) => (
          <img src={img.url} alt="" id="spot-images" key={i}></img>
        ))
      ) : images.length === 1 ? (
        <img src={images[0].url} id="spot-images" alt=""></img>
      ) : (
        images.length > 4 && (
          <div className="overall-img-container2">
            <img src={images[0].url} id="main-spot-img" alt=""></img>

            <div id="groupSpot-images-container">
              {images.map(
                (img, i) =>
                  i > 0 &&
                  i < 5 && (
                    <img
                      src={img.url}
                      className="groupSpot-images"
                      key={i}
                      alt=""
                    ></img>
                  )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SingleSpotImages;
