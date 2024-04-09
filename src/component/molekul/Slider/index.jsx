/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ListSlider } from "../../../component";

const Sliders = ({ onCLick, dataSpecials }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <div className="slider-container slide-section content-section">
      <h2 className="text-black text-xl text-left font-semibold pb-4">What consultation do you want today ?</h2>
      <Slider {...settings}>
        { dataSpecials.map((cur, i) => {
            return (
              <ListSlider key={i} title={cur.name} onClick={() => onCLick(cur.id)} />
            )
          })
        }
      </Slider>
    </div>
  )
}

export default Sliders