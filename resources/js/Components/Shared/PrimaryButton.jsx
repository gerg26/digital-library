import { Link } from "@inertiajs/react"
import React from "react"
export default function PrimaryButton({text, children, style, onClick, link, type, className}) {
    // determines "children"
    var item;
    if(children != null) {
        item = children;
    }
    else if(text != null) {
        item = text;
    }

    // returns
    if(link != null) {
        return (
            <Link href={link}>
                <div style={style} className={`button primary-button ${className}`} onClick={onClick}>
                    {item}
                </div>
            </Link> 
        )  
    }
    else {
        return (
            <button type={type == null ? "button" : type} style={style} className={`button primary-button ${className}`} onClick={onClick}>
                {item}
            </button>
        )
    }
}