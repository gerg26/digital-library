import React from "react";
import "../../../css/AuthPage/auth-page.css";

export default function AuthPageLayout({children}) {
    return (
        <div className="auth-page-container">
            <div className="auth-page-container-content">
                <div className="auth-page-container-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}