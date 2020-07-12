import React, { Component } from "react";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import image from "./images/men2.jpg";
import image2 from "./images/girl.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Url } from "../../../Endpoint/index";
import store from "../../../store/store";
import { connect } from "react-redux";
// import { Url } from "../../Endpoint/index";
import "./css/crousel.css";
const img = {
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const style = {
  text: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontWeight: "bold",
  },
};
class SimpleSlider extends Component {
  componentDidMount() {
    fetch(Url + "/showCrouselProduct", {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        // console.log(data);
        store.dispatch({
          type: "Product_info_didmount",
          payload: data,
        });
      });
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      pauseOnHover: false,
      afterChange: function () {
        let siblings = document.querySelectorAll(".slick-slide");
        let current = document.querySelector(".slick-current");

        // for (let i = 0; i < siblings.length; i++) {
        //   siblings[i].style.zIndex = 0;
        // }
        // current.style.zIndex = 10;
      },
      fade: true,
      autoplay: true,
      lazyLoad: "progressive",
    };
    return (
      <div className="slider">
        <Slider {...settings} style={{ zIndex: "5", overflow: "hidden" }}>
          {this.props.nsliderImgs.map((item) => {
            return (
              <div>
                {console.log("item", item.file)}
                <div
                  style={{ backgroundImage: `url(${Url + item.file})`, ...img }}
                >
                  <div className="slider_item">
                    <div className="collectionpane">
                      <h3 style={style.text}>Latest Spring Collection</h3>
                      <h1 className="title" style={{ color: "white" }}>
                        Rugged OuterWear
                      </h1>
                      <Link to="/saphona/maahru">
                        <Button> SHOP NOW</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
let NewVM = connect(function (store) {
  return {
    nsliderImgs: store.imgReducer.sliderImgs,
  };
})(SimpleSlider);
export default NewVM;
