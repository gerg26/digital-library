import '../../../css/LandingPage/top-navigation.css'
import React from 'react'
import SecondaryButton from '../Shared/SecondaryButton'
import PrimaryButton from '../Shared/PrimaryButton'
import SiteTitle from '../Shared/SiteTitle'
export default function TopNavigation() {
    return (
        <div className="top-navigation" style={{background: ''}}>
            <SiteTitle/>
            <div className='top-navigation-buttons'>
                <SecondaryButton text="Home"/>
                <SecondaryButton link="book/list" text="Books"/>
                <SecondaryButton link="auth/sign-in" text="Sign In"/>
                <PrimaryButton link="auth/sign-up" text="Sign Up"/>
            </div>
        </div>
    )
}