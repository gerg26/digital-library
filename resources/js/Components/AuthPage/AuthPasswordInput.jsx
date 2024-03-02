import React from "react";
export default function AuthPasswordInput({text, name}) {
    return <input type="password" name={name} className="auth-text-bar" placeholder={text}/>
}