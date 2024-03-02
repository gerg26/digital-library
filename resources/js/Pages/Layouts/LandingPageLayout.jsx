import React from 'react';

// imports css
import '../../../css/LandingPage/landing-page.css'

export default function LandingPageLayout({children}) {
    return <div className='landing-page-container'>
        {children}
    </div>;
}