import { Link } from "@inertiajs/react"
import React from "react"
export default function SecondaryButton({text, children, style, onClick, link}) {
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
                <div style={style} className="button secondary-button" onClick={onClick}>
                    {item}
                </div>
            </Link> 
        )  
    }
    else {
        return (
            <div style={style} className="button secondary-button" onClick={onClick}>
                {item}
            </div>
        )
    }
}