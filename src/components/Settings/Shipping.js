import React from "react";

export default function Shipping({
  configureFixedShippingg,
  configureShippingZones,
}) {
  return (
    <div>
      <div className="p-3 mb-2 bg-blueish mb-2">
        <div className="h5 mb-0 bold c-blue"> Shipping Methods</div>
      </div>
      <div className="card  mb-2  card-body ml-card-shadow">
        <div className="navbar">
          <div>
            <div className="bold">Fixed Shipping</div>
            <div>Charge a fixed rate for all your shipping products</div>
          </div>
          <button
            onClick={configureFixedShippingg}
            className="ml-dash-btn  no-outline"
          >
            (Coming Soon)
          </button>
        </div>
      </div>
      <div className="card c-blue-  card-body ml-card-shadow">
        <div className="navbar">
          <div>
            <div className="bold">Shipping Zones</div>
            <div>Configure your shipping zones and shipping fee for each</div>
          </div>
          <button
            onClick={configureShippingZones}
            className="ml-dash-btn  no-outline"
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}
