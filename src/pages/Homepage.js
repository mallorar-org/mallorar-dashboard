import React from "react";
// import jwt from "jwt-decode";
import icons from "../components/common/icons";
import { Link } from "react-router-dom";
import Progress from "../components/common/circleprogress";
import { connect } from "react-redux";
import { formatNumber } from "../util/longNumber";

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

function Homepage({ core }) {
  // const [tokenData] = useState(jwt(localStorage.mdt));
  const pages = [
    {
      title: "Messages",
      desc: "Respond to emails and notifications",
      link: "/messages",
      icon: icons.solid.message.blue,
    },
    {
      title: "Products",
      link: "/products",
      desc: "Create and manage products",
      icon: icons.solid.tag.blue,
    },
    {
      title: "Storefront",
      link: "/store",
      desc: "Manage your storefront content",
      icon: icons.solid.store.blue,
    },
    {
      title: "Orders",
      link: "/orders",
      desc: "Manage orders and clear orders",
      icon: icons.solid.truck.blue,
    },
    {
      title: "Analytics",
      link: "/analytics",
      desc: "Analyse your store and products perfomance",
      icon: icons.solid.analytics.blue,
    },
    {
      title: "Admin",
      link: "/admin",
      desc: "Request payouts and more",
      icon: icons.solid.boud.blue,
    },
    {
      title: "Users",
      link: "/users",
      desc: "Assign users to your dashboard",
      icon: icons.solid.users.blue,
    },
    {
      title: "Settings",
      link: "/settings",
      desc: "Set shipping zones and more",
      icon: icons.solid.spunner.blue,
    },
  ];
  return (
    <section className="h-100 bg-white">
      <div className=" ml-bg-pic border-bottom">
        <div className="bg-transtrad ml-container  py-2">
          <div className="d-flex  justify-content-between align-content-center">
            <div className=" w-100 d-flex  align-items-center justify-content-between">
              <div>
                <h3 className="bold mb-0 c-blue">
                  Enhance your eCommerce game
                </h3>
              </div>
              <div>
                <img
                  src={icons.logo}
                  alt=""
                  className="ml-logo-s-u-i img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-bottom ml-container">
        <div className="h5 bold c-blue mb-4">Today's Insights</div>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-3 px-0 col-6">
              <div className="d-flex align-items-center">
                <Progress
                  text=""
                  hpl={true}
                  limit={parseInt(core.productsLimit)}
                  progress={parseInt(core.totalProducts)}
                />
                <Link to="/products" className=" ml-3 justify-content-center  ">
                  <div className=" ml-s-h-t-subtext d-flex c-blue align-items-center">
                    <span className="bold">Products</span>
                    <img
                      alt=""
                      className="ml-2 img-fluid ml-h-in-cr-icon"
                      src={icons.solid.chevron.right}
                    />
                  </div>
                  <div>Total products available in your store</div>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 pr-0  col-6">
              <div className="d-flex align-items-center">
                <Progress
                  dt={true}
                  text={formatNumber(core.productVisits)}
                  limit={parseInt(core.productsLimit)}
                  progress={100}
                />
                <Link
                  to="/analytics/products"
                  className=" ml-3 justify-content-center  "
                >
                  <div className=" ml-s-h-t-subtext d-flex c-blue align-items-center">
                    <span className="bold">Product Visits</span>
                    <img
                      alt=""
                      className="ml-2 img-fluid ml-h-in-cr-icon"
                      src={icons.solid.chevron.right}
                    />
                  </div>
                  <div>
                    These are clients that clicked or opened your products in
                    the last 24hrs
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-2 text-center col-6">
              <div>
                <div className="c-blue-- bold ml-h-in-cr-num">
                  {formatNumber(core.storeVisits)}
                </div>
                <Link
                  to="/analytics/store"
                  className="ml-s-h-t-subtext justify-content-center d-flex align-items-center "
                >
                  <span>Store visits</span>
                  <img
                    alt=""
                    className="ml-2 img-fluid ml-h-in-cr-icon"
                    src={icons.solid.chevron.right}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 text-center col-6">
              <div>
                <div className="c-blue-- bold ml-h-in-cr-num">
                  {formatNumber(core.totalSales)}
                </div>
                <Link
                  to="/analytics/orders"
                  className="ml-s-h-t-subtext justify-content-center d-flex align-items-center ="
                >
                  <span>Total Sales</span>
                  <img
                    alt=""
                    className="ml-2 img-fluid ml-h-in-cr-icon"
                    src={icons.solid.chevron.right}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="border">
          <div className="ml-whitish p-3">
            <h2 className="bold mb-0 c-blue">Where to </h2>
            <div className="c-blue-  border-bottom pb-3 t14">
              <div className="bol ">
                Manage products, orders, your store and more in your secure
                dashboard
              </div>
            </div>

            <div className="container-fluid px-0">
              <div className="row">
                <div className="col-12 d-flex mt-3 flex-wrap mb-2 px-2">
                  {pages.map((x, index) => (
                    <Link to={x.link} key={index} className="col-4 mb-3 px-2">
                      <div className=" cp bg-bg  ml-shadow p-3 rounded">
                        <div className="d-flex align-items-center">
                          <img src={x.icon} className="ml-o-s-ic" alt="" />
                          <div className="ml-2">
                            <div className="bold c-blue mb-0 h5">{x.title}</div>
                            <div
                              style={{ lineHeight: "initial" }}
                              className="c-blue text-muted t15"
                            >
                              {x.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="t14 text-secondary">Mallorar Dashboard v2</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connect(mapStateToProps, null)(Homepage);
