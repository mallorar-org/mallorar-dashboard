import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";

class DateRangePicker extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  onChange = (dates) => {
    const [start, end] = dates;
    this.setState({
      startDate: start,
      endDate: end,
    });
  };
  toggle = (s) => {
    this.setState({
      isOpen: s,
    });
  };
  render() {
    return (
      <div className="position-relative">
        <button
          onClick={() =>
            this.setState({
              isOpen: true,
            })
          }
          style={{ minWidth: "200px" }}
          className="d-flex  align-items-center form-control py-1 position-relative cp align-items-center pr-2"
        >
          {/* <div className="mr-1">Date Range</div> */}
          {/* <BiCalendar className="mr-2" /> */}
          <div className="mb-0 cp">
            {dayjs(this.state.startDate).format("L")}
            {/* {dayjs(this.state.startDate).format("L") ===
            dayjs(new Date()).format("L")
              ? dayjs(this.state.startDate).format("L")
              : "Today"} */}
            {this.state.endDate && (
              <>- {dayjs(this.state.endDate).format("L")}</>
            )}
          </div>
        </button>

        <div
          className={`${this.state.isOpen ? "d-block" : "d-none"} +
                " position-absolute  bg-white  shadow rounded ml-calender-drop-down-container`}
        >
          <div className="container-fluid w-100">
            <div className="row">
              <div className="col-9 p-3 px-0 position-relative">
                <div className="d-flex">
                  <div>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.onChange}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      selectsRange
                      inline
                    />
                  </div>
                  <div className="ml-3">
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.onChange}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      selectsRange
                      inline
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 border-left py-3">
                <button className="btn ml-btn bg-blueish w-100 mb-2">
                  Today
                </button>
                <button className="btn ml-btn w-100 mb-2">Last 7 Days</button>
                <button className="btn ml-btn w-100 mb-2">Last 30 Days</button>
                <hr />
                <button className="btn ml-dash-btn border-0 mb-2 w-100">
                  Apply
                </button>
                <button
                  onClick={() => this.toggle(false)}
                  className="btn btn-danger border-0 w-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangePicker;
