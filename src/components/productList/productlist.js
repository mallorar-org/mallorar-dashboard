import React, { Component } from "react";
import ProductItem from "./productItem";
// import pex from "../../assets/images/pex.jpg";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import CheckBox from "../common/CheckBox";

class productlist extends Component {
  state = {
    products: [],
    allSelected: false,
  };
  componentDidMount() {
    this.setState({ products: this.props.products });

    // console.log(this.props.products);
  }

  sort = (e, array) => {
    const target = e.target.getAttribute("data-role");
    return this.setState({
      sort:
        target.split("-")[1] === "asc"
          ? array.sort((a, b) => b.productName.localeCompare(a.productName))
          : array.sort((a, b) => a.productName.localeCompare(b.productName)),
    });
  };

  render() {
    dayjs.extend(LocalizedFormat);

    return (
      <>
        <div className="container-fluid">
          <div className="row c-blue- text-left ml-table-header py-0 border-bottom">
            <div className="col-4 d-flex px- p-lg-3 border-right">
              <CheckBox
                onchange={() =>
                  this.setState({ allSelected: !this.state.allSelected })
                }
                checked={this.state.allSelected}
              />
              <span className="ml-3">Product</span>
            </div>
            <div className="col-1 px- p-lg-3"> PID </div>
            <div className="col-2 px- p-lg-3">Category</div>
            <div className="col-1 px- p-lg-3">*</div>
            <div className="col-2 px- p-lg-3">Status</div>
            <div className="col-2 px- p-lg-3">Last Modified</div>
          </div>
        </div>

        {this.state.products.map((pr, index) => (
          <ProductItem
            productDeleted={(p) => this.props.productDeleted(p)}
            messageShow={(m) => this.props.messageShow(m)}
            key={index}
            pid={pr.PID}
            productName={pr.productName}
            productpic={pr.img}
            stockAvailibity={pr.stock}
            category={pr.category.replace(/-/g, " ")}
            isFeatured={pr.isFeatured}
            productStatus={pr.status}
            date={pr.date}
            datehtmlFor={"Date Created"}
          />
        ))}
      </>
    );
  }
}

export default productlist;
