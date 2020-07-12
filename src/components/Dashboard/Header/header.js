import React, { Component } from "react";
import { Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { Url } from "../../../Endpoint/index";
import "./header.css";
import { connect } from "react-redux";
import CartModal from "./cartModal/cartModal";
import MenuDrawer from "./Drawer/drawer";
import { withRouter } from "react-router-dom";
import store from "../../../store/store";
const style = {
  link: { backgroundColor: "transparent", fontSize: "15px" },
  heading: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: "45px",
  },
};
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgPosition: "absolute",
      saphonaSubCats: [],
      auraSubCats: [],
    };
  }
  componentDidMount() {
    fetch(Url + "/getSubCatD", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Dataaaa", data);
        store.dispatch({
          type: "SUB_CAT_D",
          payload: data,
        });
      });
  }
  componentWillReceiveProps = (nextP, prevS) => {
    let saphonacat = nextP.subCats
      .filter((item) => {
        return item.maincategory == "Saphona";
      })
      .map((item) => {
        return item.subCateg;
      });
    console.log("cattttttttttt", saphonacat);
    this.setState({
      saphonaSubCats: saphonacat,
    });

    // for aura

    let auraCat = nextP.subCats
      .filter((item) => {
        return item.maincategory == "Aura";
      })
      .map((item) => {
        return item.subCateg;
      });
    console.log("auraaaaaaa", auraCat);
    this.setState({
      auraSubCats: auraCat,
    });
  };
  // onBgColorChange = bgPosition => {
  //   // localStorage.setItem("bgPosition", bgPosition);
  //   this.setState({
  //     bgPosition: bgPosition
  //   });
  // };
  render() {
    if (this.props.match.url == "/contact-us") {
      var color = "white";
    } else {
      var color = "black";
    }
    // console.log(this.props.cart)
    return (
      <div
        className="headr_main_div"
        style={{
          position: this.state.bgPosition,
          zIndex: 10,
          top: 0,
          width: "100%",
          paddingTop: "15px",
        }}
      >
        <div style={{ backgroundColor: "transparent", zIndex: 10 }}>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                className="menu_icon"
                style={{
                  flexGrow: "inherit",
                  marginLeft: "10px",
                  paddingTop: "20px",
                }}
              >
                <MenuDrawer color={color} />
              </div>
              <div
                className="logo"
                style={{
                  marginLeft: "20%",
                  flexGrow: "inherit",
                  textAlign: "center",
                }}
              >
                <Link to="/">
                  <h1 style={{ color: color, ...style.heading }}>
                    Saphona.
                    {/* {this.props.subCats.maincategory} */}
                  </h1>
                </Link>
              </div>
            </Col>

            <Col span={12}>
              <div className="headerRight">
                <ul style={{ listStyle: "none" }} className="ul">
                  <li className="listitem responsive">
                    <Link
                      to="/"
                      // onClick={()=>this.onBgColorChange('static')}
                      style={{ color: color, ...style.link }}
                    >
                      HOME
                    </Link>
                  </li>

                  <li className="listitem responsive">
                    <div class="dropdown">
                      <span className="dropbtn" style={{ color: color }}>
                        Saphona
                      </span>
                      <div class="dropdown-content">
                        {this.state.saphonaSubCats.map((item) => {
                          return (
                            <Link to={`/Saphona/${item}`}>
                              <span className="dpdwn_link">
                                {item}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="listitem responsive">
                    <div class="dropdown">
                      <span className="dropbtn" style={{ color: color }}>
                        Aura
                      </span>
                      <div class="dropdown-content">
                        {this.state.auraSubCats.map((item) => {
                          return (
                            <Link to={`/Aura/${item}`}>
                              <span className="dpdwn_link">
                                {item}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </li>

                  <li className="listitem responsive">
                    <Link
                      to=""
                      style={{ backgroundColor: "transparent", color: color }}
                    >
                      <MdSearch size={25} />
                    </Link>
                  </li>

                  <li
                    style={{ backgroundColor: "transparent", color: color }}
                    className="listitem "
                  >
                    <Badge
                      // count={this.props.cart.length}
                      style={{
                        borderWidth: "0px",
                        boxShadow: "0 0 0 0",
                      }}
                    >
                      <CartModal />
                    </Badge>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div></div>
        </div>
      </div>
    );
  }
}
// export default withRouter(Header);
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
  };
})(withRouter(Header));
export default NewVM;
