import React from "react";

export default function OrderItemLst({
  itemCost,
  itemImage,
  itemName,
  itemsQty,
  itemsTotal,
  itemVar,
  ItemId,
}) {
  return (
    <div className="d-flex align-items-center ml-table-row">
      <div className="col-4 text-center pl-3 d-flex align-items-center">
        <div className="col-5 text-center p-2">
          <img src={itemImage} alt="" className="img-fluid ml-product-img" />
        </div>
        <div className="col-7 text-center">{itemName}</div>
      </div>
      <div className="col-2 text-center">{ItemId}</div>
      {/* <div>
            <div>Variation : {itemVar}</div>

        </div>*/}
      <div className="col-2 text-center">{itemCost}</div>
      <div className="col-2 text-center">{itemsQty}</div>
      <div className="col-2 text-center">{itemsTotal}</div>
    </div>
  );
}
