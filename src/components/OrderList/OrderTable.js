import React from "react";
import OrderListItem from "./OrderListItem";

export default function OrderTable({ orders }) {
  return (
    <div className="bg-white card rounded-0 border-0 text-left position-relative text-center">
      <div className="d-flex flex-wrap c-blue- ml-table-header py-2  position-sticky">
        <div className="col-2 pl-3">Order</div>
        <div className="col-2">Date</div>
        <div className="col-2">To. Country</div>
        <div className="col-2">Status</div>
        <div className="col-2">T. items</div>
        {/*customer id*/}
        <div className="col-2">-</div>
      </div>

      {orders.map((order, index) => (
        <OrderListItem
          key={index}
          status={order.paymentStatus}
          orderId={order.orderNumber}
          shippingCountry={order.receiverCountry}
          orderStatus={"cancelled"}
          dateOfOrder={order.dateOfOrder}
        />
      ))}
    </div>
  );
}
