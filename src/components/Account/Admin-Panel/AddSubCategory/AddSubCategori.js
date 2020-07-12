import React from "react";
import "./css/cssfile.css";
import { Url } from "../../../../Endpoint/index";

class AddSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCateg: "",
      maincategory: "",
    };
  }

  handleChange = (event) => {
    console.log("event.tar", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelectForMain = (event) => {
    this.setState({ maincategory: event.target.value });
  };
  saveData = (event) => {
    event.preventDefault();
    // console.log("MainCategory", this.state.maincategory);
    // console.log("subCat", this.state.subCateg);
    // let formdata = new FormData();
    // formdata.append("maincategory", this.state.maincategory);
    // formdata.append("subCateg", this.state.subCateg);
    let data = {
      maincategory: this.state.maincategory,
      subCateg: this.state.subCateg,
    };
    fetch(Url + "/createSubCat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          this.setState({
            subCateg: "",
            maincategory: "",
          });
        }
      });
  };

  render() {
    return (
      <div className="addSubCat_most_main_div">
        <div>
          <div className="title_main_div">
            <h3 className="title_subDiv">Please Select SubCategory</h3>
          </div>
          <div className="form_main_div">
            <form id="Form">
              <label for="lname">Select Category</label>

              <select
                className="lebelBox"
                value={this.state.maincategory}
                onChange={this.handleSelectForMain}
              >
                <option>Select Category</option>
                <option value="Saphona">Saphona</option>
                <option value="Aura">Aura</option>
              </select>
              <label className="SubCat" for="EnterSubCAt">
                Enter SubCategory
              </label>
              <input
                type="text"
                id="SubCat"
                name="subCateg"
                placeholder="Enter SubCategory Name"
                onChange={this.handleChange}
                value={this.state.subCateg}
              />
              <input type="submit" value="Submit" onClick={this.saveData} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSubCategory;
