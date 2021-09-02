import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import MLSelect from "../MLSelect/MLSelect";
import {
  AiFillCaretDown,
  AiFillFilePdf,
  AiOutlineBarChart,
  AiOutlineDownload,
  AiOutlineLineChart,
} from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";

import { Link } from "react-router-dom";
import { BarChart } from "recharts";
import { FaDownload } from "react-icons/fa";

const data = {
  options: {},
  labels: [
    "1 Jan",
    "2 Jan",
    "3 Jan",
    "4 Jan",
    "5 Jan",
    "6 Jan",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ],
  datasets: [
    {
      label: "Revenue in produced",
      backgroundColor: "#1c33499e",
      borderColor: "#1c3349",
      borderWidth: 1,
      hoverBackgroundColor: "#1c3349",
      hoverBorderColor: "#1c3349",
      data: [
        465,
        59,
        80,
        181,
        56,
        55,
        150,
        180,
        381,
        56,
        555,
        50,
        180,
        381,
        256,
        455,
        410,
        402,
        232,
      ],
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Record period (Months)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
        },
        scaleLabel: {
          display: true,
          labelString: "Revenue generated ($US)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
};

class RevenueAnalytics extends Component {
  state = {};
  render() {
    return (
      <section className="bg-white">
        <div className="container-fluid mt-0">
          <div className="row">
            <div className="col-lg-9 col-md-12 border-right p-0">
              <div className="bg-white p-3">
                <div className="d-flex justify-content-between">
                  <div className="bold d-flex h4 mb-0">
                    <div className="d-flex align-items-center">
                      {" "}
                      Revenue
                      <div className="h6 mb-0 ml-1">
                        {" "}
                        |{"  "} In the last 30 Days
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-center pr-2"></div>
                    <div className="d-flex align-items-center">
                      {/* <span>Type</span> */}
                      {/* {this.props.graphType === "line" ? (
                        <AiOutlineLineChart style={{ fontSize: "27px" }} />
                      ) : (
                        <AiOutlineBarChart style={{ fontSize: "27px" }} />
                      )} */}
                      <span className="mx-2">Chart Type</span>
                      <div style={{ minWidth: "150px" }} className="mb-0 ml-2">
                        <MLSelect
                          handleChange={(v) => this.props.changeGraph(v.value)}
                          defaultValue={[
                            {
                              value: "bar",
                              label: (
                                <div className="d-flex align-items-center">
                                  {" "}
                                  <AiOutlineLineChart
                                    className="mr-1"
                                    style={{ fontSize: "27px" }}
                                  />
                                  Line chart
                                </div>
                              ),
                            },
                          ]}
                          options={[
                            {
                              value: "line",
                              label: (
                                <div className="d-flex align-items-center">
                                  {" "}
                                  <AiOutlineLineChart
                                    className="mr-1"
                                    style={{ fontSize: "27px" }}
                                  />
                                  Line chart
                                </div>
                              ),
                            },
                            {
                              value: "bar",
                              label: (
                                <div className="d-flex align-items-center">
                                  {" "}
                                  <AiOutlineBarChart
                                    className="mr-1"
                                    style={{ fontSize: "27px" }}
                                  />
                                  Bar chart
                                </div>
                              ),
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  {/* <div className="bold h5 text-secondary">Total $3453</div> */}
                  <div className="ml-ana-lar mt-2">
                    {this.props.graphType === "line" ? (
                      <Line
                        data={data}
                        width={100}
                        height={300}
                        options={options}
                      />
                    ) : (
                      <Bar
                        data={data}
                        width={100}
                        height={300}
                        options={options}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 py-3">
              <div className="bold h5">Revenue Summary</div>
              <div className="mt-3">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Sales</td>
                      <td>$23 000</td>
                    </tr>
                    <tr>
                      <td>Net Sales</td>
                      <td>$23 000</td>
                    </tr>
                    <tr>
                      <td>Returns</td>
                      <td>$23 000</td>
                    </tr>

                    <tr>
                      <td>Orders</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Total Revenue</td>
                      <td>$70 329</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="col-3 p-0">
              <div className="bg-white ml-card-shadow p-3">
                <div className="h5 text-secondary mb-2">Sales</div>
                <div className="h4 bold mb-2">$ 12 442</div>
              </div>
            </div>
            <div className="col-3 p-0">
              <div className="bg-white ml-card-shadow p-3">
                <div className="h5 text-secondary mb-2">Returns</div>
                <div className="h4 bold mb-2">$ 0</div>
              </div>
            </div>
            <div className="col-3 p-0">
              <div className="bg-white ml-card-shadow p-3">
                <div className="h5 text-secondary mb-2">Shipping</div>
                <div className="h4 bold mb-2">$ 12 442</div>
              </div>
            </div>
            <div className="col-3 p-0">
              <div className="bg-white ml-card-shadow p-3">
                <div className="h5 text-secondary mb-2">Total</div>
                <div className="h4 bold mb-2">$ 12 442</div>
              </div>
            </div>
     */}
          </div>
        </div>
        <div className="bg-white ml-card-shado border-top pb-3 mt-0">
          <div className="ml-container align-items-center d-flex justify-content-between py-3">
            <div className="bold mb-0 h5">Revenue Split</div>
            <div className="mb-0 h6">
              <button className="ml-btn d-flex align-items-center">
                <AiOutlineDownload className="mr-1" />
                Download
              </button>
            </div>
          </div>
          <table className="table text-center table-striped">
            <thead>
              <tr className="bold ">
                <td>Date</td>
                <td>Orders</td>
                <td>Gross Sales</td>
                <td>Net Sales</td>
                <td>Returns</td>
                <td>Shipping</td>
                <td>Total Sales</td>
              </tr>
            </thead>
            <tbody>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>3</td>
                <td>$32 092</td>
                <td>$32 092</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>2</td>
                <td>$212</td>
                <td>$212</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>2</td>
                <td>$212</td>
                <td>$212</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>2</td>
                <td>$212</td>
                <td>$212</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>2</td>
                <td>$212</td>
                <td>$212</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
              <tr className="bold">
                <td>23.02/2020</td>
                <td>2</td>
                <td>$212</td>
                <td>$212</td>
                <td>$212</td>
                <td>$32 092</td>

                <td>$320 098</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default RevenueAnalytics;
