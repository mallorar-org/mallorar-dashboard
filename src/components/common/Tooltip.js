import React from "react";

export default function Tooltip({ children, kind, text = "", direction = "" }) {
  if (kind === "htt") {
    return (
      <span className="ml-toolTipShow ml-htt">
        <div className={`ml-tooltip ${direction}`}>
          {text} <div />
        </div>
        {children}
      </span>
    );
  }

  return (
    <span className="ml-toolTipShow">
      <div className={`ml-tooltip ${direction}`}>
        {text} <div />
      </div>
      {children}
    </span>
  );
}
