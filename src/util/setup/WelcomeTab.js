import React, { Component } from "react";

class WelcomeTab extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="h2 text-dark bold mb-0">Welcome</div>
        Congradulations for making it through to your dashboard, we welcome you
        <div className="mt-2">
          <p>Now to get a few things out of the way,</p>
          <ul>
            <li>
              This could be your last time seeing this page depending on if you
              complete your setup or not
            </li>
            <li>
              All required documents must be scanned (pdf) documents of the
              original copy.
            </li>
            <li>
              <strong>NOTE : </strong> We are able to detect any fraud as we
              verify your documents manually, so make sure you upload the
              correct data
            </li>
            <li>
              We assume that your bank is where your business is and we're only
              able to deposit money in the country of your business.{" "}
              <a href="https://docs.mallorar.com/bankdeposits">
                Read more here
              </a>
            </li>
            <li>
              We still assume you're able to deliver products to customers and
              Mallorar doesn't manage delivery for sellers
            </li>
          </ul>
        </div>
        <div>
          <div className="h3 text-dark bold">Have these documents prepared</div>
          <div className="">
            <ol>
              <li>
                Business registration clearly showing the business details and
                name that matches the one you provided upon during regsitration.
                <strong> (Not necessesary to unregistered businesses)</strong>
              </li>
              <li>
                Proof of citizenship (Birth certificate / Passport / Visa / ID
                card)
              </li>
              <li>Proof of residence not older than 30 days</li>
            </ol>
          </div>
          <div className="text-center">
            <button
              onClick={() => this.props.nav("next")}
              className="btn bold h5 mb-0 px-4 py-2 ml-dash-btn"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeTab;
