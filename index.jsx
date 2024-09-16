import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css"; 

// eslint-disable-next-line react/prop-types
export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSLide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  function handlePrev() { 
    setCurrentSLide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSLide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading data! Please wait </div>;
  }

  if (errorMsg !== null) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrev}
        className="arrow arrow-left"
      />

      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}

      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />

      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicators"
                    : "current-indicators inactive-indicators"
                }
                onClick={() => setCurrentSLide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
