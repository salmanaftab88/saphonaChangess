import React from "react";
import { Url } from "../../../../Endpoint/index";
import { Upload, Icon } from "antd";
import { connect } from "react-redux";
import store from "../../../../store/store";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class AddSubCatPd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "",
      description: "",
      title: "",
      image: [],
      saleprice: "",
      file: [],
      img: "",
      subcat: "",
      maincategory: "",
      fileList: [],
      saphonaSubCats: [],
      auraSubCats: [],
    };
  }
  handleimg = (event) => {
    this.setState({ image: [...this.state.image, ...event.target.files] });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelect = (event) => {
    this.setState({ subcat: event.target.value });
  };
  handleSelectForMain = (event) => {
    this.setState({ maincategory: event.target.value });
  };
  saveData = (event) => {
    event.preventDefault();
    let formdata = new FormData();
    this.state.image.map((item) => {
      formdata.append("file", item);
    });
    formdata.append("title", this.state.title);
    formdata.append("description", this.state.description);
    formdata.append("price", this.state.price);
    formdata.append("saleprice", this.state.saleprice);
    formdata.append("mainCat", this.state.maincategory);
    formdata.append("subCat", this.state.subcat);
    console.log(this.state, "asdasdasdadadasdasdasdasdasdadasdadasda");
    fetch(Url + "/subCatUploads", {
      method: "POST",
      body: formdata,
    }).then((resp) => {
      if (resp) {
        this.setState({
          price: "",
          description: "",
          title: "",
          saleprice: "",
          subcat: "",
          maincategory: "",
          saphonaSubCats: [],
          auraSubCats: [],
        });
        document.getElementById("Form").reset();
      }
    });
  };
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

  // handlefile = ({ file, onSuccess }) => {
  //   // setTimeout(function() {
  //   //   onSuccess("ok");
  //   // }, 0);
  //   let data = new FormData();
  //   data.append("file", file);
  //   var options = {
  //     method: "POST",
  //     body: data,
  //   };
  //   fetch(`${Url}/filehandler`, options)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       onSuccess(res);
  //     });
  // };

  // handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handlefileChange = ({ fileList }) => {
  //   this.setState({ fileList });
  // };

  render() {
    let { fileList } = this.state;
    // console.log(this.state.subcat);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <div className="FP_upload_main_div">
          <div className="FP_title_div">
            <h3 className="Crousel_img_upload_title">
              Please Uplaod A Sub-Category Product
            </h3>
          </div>

          <div className="FP_uplaod_description_price_div">
            <form id="Form">
              <label for="EnterDesc">Enter Title</label>
              <input
                type="text"
                id="ftitle"
                name="title"
                placeholder="Enter Title.."
                onChange={this.handleChange}
                value={this.state.title}
              />
              <label for="lname">Enter Description</label>
              <input
                type="text"
                id="fdesc"
                name="description"
                placeholder="Enter Description.."
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label for="lname">Enter Price</label>
              <input
                type="text"
                id="fprice"
                name="price"
                placeholder="Enter Price.."
                onChange={this.handleChange}
                value={this.state.price}
              />
              <label for="lname">Enter SalePrice</label>
              <input
                type="text"
                id="fsaleprice"
                name="saleprice"
                placeholder="Enter SalePrice.."
                onChange={this.handleChange}
                value={this.state.saleprice}
              />
              <label for="lname">Select Category</label>

              <select
                value={this.state.maincategory}
                onChange={this.handleSelectForMain}
              >
                <option>Select Category</option>
                <option value="Saphona">Saphona</option>
                <option value="Aura">Aura</option>
                {/* <option value="Noor-ul-ain">Noor-ul-ain</option> */}
              </select>

              <label hidden={this.state.maincategory == ""}>
                Select SubCategory
              </label>

              <select
                value={this.state.subcat}
                onChange={this.handleSelect}
                hidden={this.state.maincategory == ""}
              >
                <option hidden={this.state.maincategory == "Saphona" || "Aura"}>
                  Select Sub-Category
                </option>
                {this.props.subCats
                  .filter((item) => {
                    return item.maincategory == this.state.maincategory;
                  })
                  .map((item) => {
                    return (
                      <option
                        value={item.subCateg}
                        // hidden={this.state.maincategory == "Aura"}
                      >
                        {item.subCateg}
                      </option>
                    );
                  })}
              </select>
              <input
                type="file"
                name="file"
                id="myFile"
                onChange={this.handleimg}
                multiple
              />
              {/* <Upload
                multiple
                customRequest={this.handlefile}
                // action='../../Images'

                // defaultFileList={this.state.defaultlist}
                listType="picture-card"
                defaultFileList={fileList}
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handlefileChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload> */}
              <input type="submit" value="Submit" onClick={this.saveData} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
// export default AddSubCatPd;
let NewVM = connect(function (store) {
  return {
    subCats: store.imgReducer.subCats,
  };
})(AddSubCatPd);
export default NewVM;
