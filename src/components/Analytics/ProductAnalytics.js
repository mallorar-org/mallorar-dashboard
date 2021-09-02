import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import MLSelect from "../MLSelect/MLSelect";
import ProductRow from "./ProductAnalysis/ProductOrders";
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
    "1 Dec",
    "2 Dec",
    "3 Dec",
    "4 Dec",
    "5 Dec",
    "6 Dec",
    "7 Dec",
    "8 Dec",
    "9 Dec",
    "10 Dec",
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
      label: "Total product impression",
      backgroundColor: "#1c33499e",
      borderColor: "#1c3349",
      borderWidth: 1,
      hoverBackgroundColor: "#1c3349",
      hoverBorderColor: "#1c3349",
      data: [
        0,
        0,
        1,
        4,
        0,
        10,
        30,
        80,
        381,
        356,
        455,
        350,
        280,
        381,
        356,
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
          labelString: "Product Impression",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
};

class ProductAnalytics extends Component {
  state = {};
  render() {
    return (
      <section className="">
        <div className="container-fluid bg-white mt-0">
          <div className="row">
            <div className="col-lg-9 col-md-12 border-right p-0">
              <div className="bg-white p-3">
                <div className="d-flex justify-content-between">
                  <div className="bold d-flex h4 mb-0">
                    <div className="d-flex align-items-center">
                      {" "}
                      Product Perfomance
                      <div className="h6 mb-0 ml-1"> |{"  "} Today</div>
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
              <div className="bold h5">Summary</div>
              <div className="mt-3">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Impressions</td>
                      <td>234</td>
                    </tr>
                    <tr>
                      <td>Winning Product</td>
                      <td>#PD324</td>
                    </tr>
                    <tr>
                      <td>Top Perfoming Product</td>
                      <td>#PD3249</td>
                    </tr>
                    <tr>
                      <td>Poor Perfoming Product</td>
                      <td>#PD3249</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid border-top bg-white mt-0">
          <div className="row ">
            <div className="col-lg-6 border-right col-12 p-0">
              <div className="bg-white p-3">
                <div className="h5 text-dark border-bottom pb-2 bold mb-2">
                  Product Analysis
                </div>
                <div>
                  <div className="mt-2 w-100">
                    <div className="d-flex w-100 align-items-center">
                      <div className="mr-2 bold">1.</div>
                      <ProductRow />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="mr-2 bold">2.</div>
                      <ProductRow />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="mr-2 bold">3.</div>
                      <ProductRow />
                    </div>
                    <div className="w-100 cp text-secondary text-center pt-2">
                      + more 234 results
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12  p-0">
              <div className="p-3">
                <div className="d-flex justify-content-between border-bottom pb-2 ">
                  <div>
                    <div className="h5 text-dark bold mb-0">
                      Recommendations
                    </div>
                  </div>
                  <div className="text-success">3</div>
                </div>

                <div>
                  <div className="mt-2 w-100">
                    <div className="d-flex w-100 align-items-center">
                      <div className="mr-2 bold">1.</div>
                      <ProductRow />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="mr-2 bold">2.</div>
                      <ProductRow />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="mr-2 bold">3.</div>
                      <ProductRow />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductAnalytics;
