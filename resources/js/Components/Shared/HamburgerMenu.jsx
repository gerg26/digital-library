import React, { useState } from "react"
import useScreenSize from "../../Hooks/Shared/useScreenSize"


export default function HamburgerMenu({sidebar: sideBar, topBar, children}) {
    // gets screen size
    const screenSize = useScreenSize();

    // use menuState
    const [menuState, setMenuState] = useState("default");

    // gets is mobile
    const isMobile = screenSize.width <= 500;

    // init showSidebar
    let showSideBar = false;

    // sets showSidebar
    if(menuState == "default") {
        // handles desktop
        if(!isMobile) {
            showSideBar = true;
        }
        else {
            showSideBar = false;
        }
    }
    else {
        showSideBar = menuState == "show";
    }

    // handles `hamburger button`
    const handleHamburgerButton = () => {
        var newMenuState;
        if(menuState == "show") {
            newMenuState = "hide";
        }
        else if(menuState == "hide") {
            newMenuState = "show";
        }
        else {
            if(!isMobile) {
                newMenuState = "hide";
            }
            else {
                newMenuState = "show";
            }
        }

        // 
        setMenuState(newMenuState);
    }

    // handles content click
    const handlesContentClick = () => {
        if(isMobile) {
            setMenuState("hide")
        }
    }
    
    return (
            
        <div className="w-screen h-screen flex flex-col sticky">
            <div className="h-full flex">
                <div className="absolute z-50">
                    <button onClick={handleHamburgerButton}>
                        <svg className="w-10 h-10 sm:w-14 ml-2 mt-2 sm:h-14 text-[#5B5B5B]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0"/>
                        </svg>
                    </button>
                </div>
                <div className={`
                    h-full bg-[#e9e9e9] flex flex-col side-bar
                    ${
                        isMobile ?
                            showSideBar ?
                                "absolute w-44" :
                                "static w-0 hidden"
                        : 
                            showSideBar ?
                                "min-w-64" :
                                "w-0 hidden"
                    }    
                `}>
                    <div className="mt-20 sm:mt-28 h-full ml-2 sm:ml-3">
                        {sideBar}
                    </div>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div className={`
                        h-28 w-full top-bar
                        ${
                            isMobile ?
                                showSideBar ?
                                    "" :
                                    ""
                            : 
                                showSideBar ?
                                    "" :
                                    ""
                        }
                    `}>
                        {topBar}
                    </div>
                    <div className={`
                        p-5 sm:p-10 h-full w-full
                        overflow-y-auto
                        ${
                            isMobile ?
                                showSideBar ?
                                    "" :
                                    ""
                            : 
                                showSideBar ?
                                    "" :
                                    ""
                        }
                    `} onClick={handlesContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )    
}