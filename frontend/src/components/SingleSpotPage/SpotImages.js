const SingleSpotImages = ({ spot }) => {
  let images = [...spot.spotImages];

  if (!images || images.length === 0)
    return <p style={{ fontStyle: "italic" }}>No images to display</p>;
  return (
    <div>
      {images.length > 1 && images.length < 5 ? (
        images.map((img, i) => (
          <img src={img.url} id="spot-images" key={i}></img>
        ))
      ) : images.length === 1 ? (
        <img src={images[0].url} id="spot-images"></img>
      ) : (
        images.length > 4 && (
          <div>
            <img src={images[0].url} id="main-spot-img"></img>

            <div id="groupSpot-images-container">
              {images.map(
                (img, i) =>
                  i > 1 &&
                  i < 5 && (
                    <img
                      src={img.url}
                      className="groupSpot-images"
                      key={i}
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
