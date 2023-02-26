import React from "react";

import s from "./styles.modules.css";
import { Link } from "react-router-dom";
import  notFound from "./img/notfound.svg";

export const NotFound = ( {children, title, buttonText = "На главную", buttonAction} ) => {
     return (
     <>
    <div className={s.notFound}>
        <img src={notFound} className={s.image} aria-hidden="true" alt="" />
        <h1 className={s.title}>{title}</h1>
        {children && children}
        {buttonAction
            ? <a href="#" className="btn" onClick={buttonAction}>{buttonText}</a>
            : <Link to="/" className="btn" >{buttonText}</Link>
        }
    </div>
    </>
    );
}