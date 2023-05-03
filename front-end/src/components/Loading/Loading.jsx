import React from "react";
import ReactLoading from "react-loading";
import "./Loading.scss";

const Loading = ({ type = "spokes", color = "red" }) => (
    <div className="overlay">
        <ReactLoading type={type} color={color} />
    </div>
);

export default Loading;
