import React from "react";
export default function AuthTextInput({text, name}) {
    return <input type="text" name={name} className="auth-text-bar" placeholder={text}/>
}