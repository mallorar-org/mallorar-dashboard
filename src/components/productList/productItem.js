import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CheckBox from "../common/CheckBox";
import { connect } from "react-redux";
import {
  addToSelectedPDList,
  deleteProduct,
} from "../../store/actions/actions";
import store from "../../store/store";
import { FaEllipsisV } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { AiFillEdit, AiOutlineEllipsis } from "react-icons/ai";
import "react-dropdown/style.css";
import Dropdown from "../SelectItem/Dropdown/index";
import { MenuItem } from "@trendmicro/react-dropdown";

const mapStateToProps = (state) => {
  return {
    selectedProducts: state.productAR.selectedProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToSelectedPDList: (n) => dispatch(addToSelectedPDList(n)),
    deleteProduct: (n) => dispatch(deleteProduct(n)),
  };
};

class MOREOPTIONS extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-between pr-3">
        <div>
          <div>{dayjs(this.props.date).format("L")}</div>
          <div className=""> at {dayjs(this.props.date).format("LT")}</div>
        </div>
        <div>
          <Dropdown pullRight={true} onSelect={(eventKey) => {}}>
            <Dropdown.Toggle
              noCaret={true}
              componentClass="div"
              btnStyle="default"
            >
              <AiOutlineEllipsis
                style={{ fontSize: "27px" }}
                className="text-dark"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="rounded border-0">
              <MenuItem header className="t14" eventKey={1}>
                Product actions
              </MenuItem>
              <MenuItem divider />
              {/* <MenuItem header>Header</MenuItem> */}
              <MenuItem className="t14" eventKey={2}>
                <Link
                  to={`products/${this.props.pid}`}
                  className="d-flex text-dark align-items-center"
                >
                  <AiFillEdit
                    style={{ fontSize: "18px" }}
                    className="mr-2 text-secondary"
                  />
                  Edit product
                </Link>
              </MenuItem>
              <MenuItem
                onSelect={() => {
                  this.props.deleteProduct(this.props.pid);
                }}
                className="t14"
                eventKey={2}
              >
                <div className="d-flex text-dark align-items-center">
                  <ImBin
                    style={{ fontSize: "18px" }}
                    className="mr-2 text-secondary"
                  />
                  Delete product
                </div>
              </MenuItem>

              {/* <MenuItem className="t14" eventKey={2}>
                <div className="d-flex align-items-center">
                  <ImBin className="mr-1" />
                  Set "Out Of Stock"
                </div>
              </MenuItem> */}
              {/* <MenuItem
                className="t14"
                eventKey={5}
                onSelect={(eventKey) => {
                  alert(`Alert from menu item.\neventKey: ${eventKey}`);
                }}
              >
                <div className="d-flex align-items-center">
                  <ImBin className="mr-1" />
                  Feature product
                </div>
              </MenuItem> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

class ProductItem extends Component {
  state = {
    selected: false,
  };

  deleteProduct = () => {};

  componentDidMount = () => {
    let selectedProducts = this.props.selectedProducts;
    let thisProduct = this.props.pid;

    if (selectedProducts.indexOf(thisProduct) !== -1) {
      this.setState({
        selected: true,
      });
    }
  };

  addToSelectedPDList = () => {
    let sp = this.props.selectedProducts;
    let selectedProducts = sp;
    let thisProduct = this.props.pid;
    let newSP = [];

    if (selectedProducts.indexOf(thisProduct) === -1) {
      this.setState({
        selected: true,
      });
      selectedProducts.push(thisProduct);
    } else {
      selectedProducts.forEach((x) => {
        if (thisProduct !== x) {
          newSP.push(x);
        }
      });
      selectedProducts = newSP;
      this.setState({
        selected: false,
      });
    }

    store.dispatch({ type: "UPDATE_SELECTED_PDS", payload: selectedProducts });
  };

  targetURL = () => {
    window.location.href = `products/${this.props.pid}`;
  };
  SliceTextTitle = (title) =>
    title.length > 37 ? `${title.slice(0, 37)}...` : title;
  render() {
    return (
      <div
        // onClick={() => this.addToSelectedPDList()}

        className={`${
          this.state.selected && "ml-pd-row-selected"
        } ml-table-row text-left a-cancel ml-product-table-row ml-hover d-flex align-items-center`}
      >
        <div className="col-4 px-0 px-lg-3 d-flex align-items-center">
          <div
            onClick={() => this.addToSelectedPDList()}
            className="col-4 px-0 d-none align-items-center d-lg-flex"
          >
            <CheckBox checked={this.state.selected} />
            <img
              src={this.props.productpic}
              alt=""
              className="ml-product-img ml-3 d-none d-lg-block"
            />
          </div>
          <div
            className="col-lg-8 col-md-12 col-12"
            title={this.props.productName}
          >
            <Link
              to={`products/${this.props.pid}`}
              className="t15 bold text-dark"
            >
              {this.SliceTextTitle(this.props.productName)}
            </Link>
          </div>
        </div>
        <div className="col-1 px-0 px-lg-3 d-flex justify-content-between">
          {this.props.pid}
        </div>
        <div className="col-2 ">
          {this.props.category.replace(/ n /g, " & ")}
        </div>
        <div className="col-1 ">
          <img
            className="ml-star-o-f-p"
            src={
              this.props.isFeatured === "true"
                ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIC0xMCA1MTEuOTg2ODUgNTExIiB3aWR0aD0iNTEyIiBjbGFzcz0iaG92ZXJlZC1wYXRocyI+PGc+PHBhdGggZD0ibTUxMC42NTIzNDQgMTg1LjkwMjM0NGMtMy4zNTE1NjMtMTAuMzY3MTg4LTEyLjU0Njg3NS0xNy43MzA0NjktMjMuNDI1NzgyLTE4LjcxMDkzOGwtMTQ3Ljc3MzQzNy0xMy40MTc5NjgtNTguNDMzNTk0LTEzNi43Njk1MzJjLTQuMzA4NTkzLTEwLjAyMzQzNy0xNC4xMjEwOTMtMTYuNTExNzE4LTI1LjAyMzQzNy0xNi41MTE3MThzLTIwLjcxNDg0NCA2LjQ4ODI4MS0yNS4wMjM0MzggMTYuNTM1MTU2bC01OC40MzM1OTQgMTM2Ljc0NjA5NC0xNDcuNzk2ODc0IDEzLjQxNzk2OGMtMTAuODU5Mzc2IDEuMDAzOTA2LTIwLjAzMTI1IDguMzQzNzUtMjMuNDAyMzQ0IDE4LjcxMDkzOC0zLjM3MTA5NCAxMC4zNjcxODctLjI1NzgxMyAyMS43MzgyODEgNy45NTcwMzEgMjguOTA2MjVsMTExLjY5OTIxOSA5Ny45NjA5MzctMzIuOTM3NSAxNDUuMDg5ODQ0Yy0yLjQxMDE1NiAxMC42Njc5NjkgMS43MzA0NjggMjEuNjk1MzEzIDEwLjU4MjAzMSAyOC4wOTM3NSA0Ljc1NzgxMyAzLjQzNzUgMTAuMzI0MjE5IDUuMTg3NSAxNS45Mzc1IDUuMTg3NSA0LjgzOTg0NCAwIDkuNjQwNjI1LTEuMzA0Njg3IDEzLjk0OTIxOS0zLjg4MjgxM2wxMjcuNDY4NzUtNzYuMTgzNTkzIDEyNy40MjE4NzUgNzYuMTgzNTkzYzkuMzI0MjE5IDUuNjA5Mzc2IDIxLjA3ODEyNSA1LjA5NzY1NyAyOS45MTAxNTYtMS4zMDQ2ODcgOC44NTU0NjktNi40MTc5NjkgMTIuOTkyMTg3LTE3LjQ0OTIxOSAxMC41ODIwMzEtMjguMDkzNzVsLTMyLjkzNzUtMTQ1LjA4OTg0NCAxMTEuNjk5MjE5LTk3Ljk0MTQwNmM4LjIxNDg0NC03LjE4NzUgMTEuMzUxNTYzLTE4LjUzOTA2MyA3Ljk4MDQ2OS0yOC45MjU3ODF6bTAgMCIgZmlsbD0iI2ZmYzEwNyIgZGF0YS1vcmlnaW5hbD0iI0ZGQzEwNyIgY2xhc3M9ImhvdmVyZWQtcGF0aCBhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGQzEwNyI+PC9wYXRoPjwvZz4gPC9zdmc+"
                : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIC0xMCA1MTEuOTg2ODUgNTExIiB3aWR0aD0iNTEycHgiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Im01MTAuNjUyMzQ0IDE4NS45MDIzNDRjLTMuMzUxNTYzLTEwLjM2NzE4OC0xMi41NDY4NzUtMTcuNzMwNDY5LTIzLjQyNTc4Mi0xOC43MTA5MzhsLTE0Ny43NzM0MzctMTMuNDE3OTY4LTU4LjQzMzU5NC0xMzYuNzY5NTMyYy00LjMwODU5My0xMC4wMjM0MzctMTQuMTIxMDkzLTE2LjUxMTcxOC0yNS4wMjM0MzctMTYuNTExNzE4cy0yMC43MTQ4NDQgNi40ODgyODEtMjUuMDIzNDM4IDE2LjUzNTE1NmwtNTguNDMzNTk0IDEzNi43NDYwOTQtMTQ3Ljc5Njg3NCAxMy40MTc5NjhjLTEwLjg1OTM3NiAxLjAwMzkwNi0yMC4wMzEyNSA4LjM0Mzc1LTIzLjQwMjM0NCAxOC43MTA5MzgtMy4zNzEwOTQgMTAuMzY3MTg3LS4yNTc4MTMgMjEuNzM4MjgxIDcuOTU3MDMxIDI4LjkwNjI1bDExMS42OTkyMTkgOTcuOTYwOTM3LTMyLjkzNzUgMTQ1LjA4OTg0NGMtMi40MTAxNTYgMTAuNjY3OTY5IDEuNzMwNDY4IDIxLjY5NTMxMyAxMC41ODIwMzEgMjguMDkzNzUgNC43NTc4MTMgMy40Mzc1IDEwLjMyNDIxOSA1LjE4NzUgMTUuOTM3NSA1LjE4NzUgNC44Mzk4NDQgMCA5LjY0MDYyNS0xLjMwNDY4NyAxMy45NDkyMTktMy44ODI4MTNsMTI3LjQ2ODc1LTc2LjE4MzU5MyAxMjcuNDIxODc1IDc2LjE4MzU5M2M5LjMyNDIxOSA1LjYwOTM3NiAyMS4wNzgxMjUgNS4wOTc2NTcgMjkuOTEwMTU2LTEuMzA0Njg3IDguODU1NDY5LTYuNDE3OTY5IDEyLjk5MjE4Ny0xNy40NDkyMTkgMTAuNTgyMDMxLTI4LjA5Mzc1bC0zMi45Mzc1LTE0NS4wODk4NDQgMTExLjY5OTIxOS05Ny45NDE0MDZjOC4yMTQ4NDQtNy4xODc1IDExLjM1MTU2My0xOC41MzkwNjMgNy45ODA0NjktMjguOTI1Nzgxem0wIDAiIGZpbGw9IiNEQ0RDREMiIGRhdGEtb3JpZ2luYWw9IiNGRkMxMDciIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmMxMDciLz48L2c+IDwvc3ZnPgo="
            }
            alt=""
          />
        </div>
        <div className="col-2 d-flex align-items-center">
          <div className="aler border-0 alert-success px-2 py-1 mb-0">
            In Stock
          </div>
        </div>
        <div className="col-2 ">
          <MOREOPTIONS
            pid={this.props.pid}
            deleteProduct={(n) => this.props.deleteProduct(n)}
            date={this.props.date}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
