const images = [
  "https://images.unsplash.com/photo-1596431537188-bb8838622be1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  "https://images.unsplash.com/photo-1596295228890-6f9115cd9c2c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  "https://images.unsplash.com/photo-1596352512034-2a2520197a71?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  "https://images.unsplash.com/photo-1594631917260-60429fc29f0a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
];

// ********************* ARROW BUTTON ****************************

function ArrowButton({ children, handleClick }) {
  return (
    <div onClick={() => handleClick()} className="btn">
      <span>{children}</span>
    </div>
  );
}

// ********************* CAROUSEL COMPONENT (MAIN) ***************
function Carousel() {
  const [index, setIndex] = React.useState(0);

  const handleClickLeft = () => {
    index === 0 ? setIndex(images.length - 1) : setIndex(index - 1);
  };

  const handleClickRight = () => {
    index === images.length - 1 ? setIndex(0) : setIndex(index + 1);
  };

  return (
    <div className="carouselContainer">
      <div
        className="photos"
        style={{ backgroundImage: `url(${images[index]})` }}
      ></div>
      <div className="btnContainer">
        <ArrowButton handleClick={handleClickLeft}>&lt;</ArrowButton>
        <ArrowButton handleClick={handleClickRight}>&gt;</ArrowButton>
      </div>
    </div>
  );
}

ReactDOM.render(<Carousel />, document.body);
