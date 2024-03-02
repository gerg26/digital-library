import React from "react";
export default function SiteTitle({style, className}) {
    var className = `title ${className}`;
    return <h1 className={className} style={{...style,textAlign: "center"}}>Digital<br/>Library</h1>
}