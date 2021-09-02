import React, { Component } from 'react';

class Sales extends Component {
    render() {
        return (
            <section className="">
                <div className="bg-white mx-3 mt-3 p-4 rounded">
                    <h4 className="text-secondary">Revenue &amp; Varility <small className="">(this Month)</small></h4>
                </div>
                <div className=" mx-3 my-2 p-1 rounded container-fluid ml-sales-details">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="bg-white pt-2 px-2 pb-2 rounded text-secondary mr-2">
                                <h5 className="mb-1">Revenue</h5>
                                <span><span className="mr-3">R</span>18888.99</span>
                            </div>
                        </div>
                        <div className="col-md-2 text-secondary text-center">
                            <div className="bg-white pt-2 mr-2 px-3">
                                <div className="ml-tile-tittle">Average Order Value</div>
                                <div className="d-flex justify-content-start px-3 align-items-end">
                                    <h5 className="mr-1 mb-2">R</h5>
                                    <div className="ml-sales-price ">125.07</div>
                                </div>
                                <div className="ml-sales-percentage text-success d-flex justify-content-start align-items-center ml-3">
                                    <i className="fa fa-sort-up mr-3 align-center mt-2"></i>8.3<span>%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 text-secondary text-center">
                            <div className="bg-white pt-2 mr-2 px-3">
                                <div className="ml-tile-tittle">Gross Profit Margin</div>
                                <div className="ml-sales-price ml-sales-percentage">38.5<span>%</span></div>
                                <div className="ml-sales-percentage text-success d-flex justify-content-start align-items-center ml-3">
                                    <i className="fa fa-sort-up mr-3 align-center mt-2"></i>8.3<span>%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 text-secondary text-center">
                            <div className=" bg-white pt-2 mr-2 px-3">
                                <div className="ml-tile-tittle">Cart Abondonement</div>
                                <div className=" ml-sales-price">45<span>%</span></div>
                                <div className="ml-sales-percentage text-success d-flex justify-content-start align-items-center ml-3">
                                    <i className="fa fa-sort-up mr-3 align-center mt-2"></i>8.3<span>%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 text-secondary text-center">
                            <div className=" bg-white pt-2 mr-2 px-3">
                                <div>Variality Coefficient</div>
                                <div className="ml-sales-price">1.35</div>
                                <div className="ml-sales-percentage text-danger d-flex justify-content-start align-items-center ml-3">
                                    <i className="fa fa-sort-down mr-3 align-center mb-2"></i>8.3<span>%</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        )
    }
}

export default Sales;