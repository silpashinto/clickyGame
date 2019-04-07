import React from "react";
import "./style.css";

function Title(props) {
  return <h4 className="title">{props.children}</h4>;
}

export default Title;
