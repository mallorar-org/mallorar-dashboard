import React from "react";
const { useState, useRef } = React;

function Test({ url }) {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const urls = [url];

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= urls.length) {
      setLoading(false);
    }
  };
  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>Loading images,</div>
      <div style={{ display: loading ? "none" : "block" }}>
        <img alt="" src={url} onLoad={imageLoaded} />
      </div>
    </>
  );
}

export default Test;
