// src/withRouter.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function withRouter(Component) {
    return function Wrapper(props) {
        const location = useLocation();
        const navigate = useNavigate();
        return <Component {...props} router={{ location, navigate }} />;
    };
}
