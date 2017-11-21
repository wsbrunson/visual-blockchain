// @flow
import React from "react";

type TypeProps = {
  loading: boolean
};

export default ({ loading }: TypeProps) => (
  <svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="10"
      y="10"
      width="30"
      height="30"
      stroke={loading ? "green" : "black"}
      fill="transparent"
      strokeWidth="5"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 60 70"
        to="360 60 70"
        dur="10s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);
