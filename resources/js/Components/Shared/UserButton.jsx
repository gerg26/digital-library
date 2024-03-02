import { Link } from "@inertiajs/react";
import { ClickAwayListener, Popper } from "@mui/material";
import React, { useState } from "react";

export default function UserButton({user}) {
    // use set show menu
    const [showMenu, setShowMenu] = useState(false);

    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // handles username clicked
    const handleUserNameClicked = () => {
        setShowMenu(!showMenu);
    }

    // handles click away
    const handleClickAway = () => {
        if(showMenu) {
            setShowMenu(false);
        }
    }

    return (
        <div className="underline" id="user-button-container">
            {
                user == null 
                ?
                    <div className="font-light text-end mx-5 sm:mx-10">
                        <Link href={`${baseUrl}/auth/sign-in`}>
                            Not Logged In
                        </Link>
                    </div>
                :
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                            <button aria-describedby="user-button" className="flex gap-2" onClick={handleUserNameClicked}>
                                <div>
                                    <svg className="w-7 h-7 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <p>
                                    {user.Username}
                                </p>
                            </button>
                            <Popper id="user-button" open={showMenu} anchorEl={document.getElementById("user-button-container")}>
                                <div className={`
                                        bg-white w-32 xxs:w-48 mt-2 px-3 py-3 border-2 border-black rounded-md right-0 mr-3
                                    }`}>
                                    <ul className="list-inside text-left space-y-2">
                                        {
                                            user != null && user.Tipe == "Biasa" ? 
                                                <Link href={`${baseUrl}/book/borrowed-books`}>
                                                    <li className="flex gap-1 items-center">
                                                        <svg className="w-5 h-5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                                                        </svg>

                                                        <p>Buku Saya</p>
                                                    </li>
                                                </Link>
                                            : 
                                                <></>
                                        }
                                        <Link href={`${baseUrl}/user/change-password`}>
                                            <li className="flex gap-1 items-center">
                                                <svg className="w-5 h-5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clipRule="evenodd"/>
                                                </svg>
                                                <p>Ganti Password</p>
                                            </li>
                                        </Link>
                                        {
                                            user != null && (user.Tipe == "Admin" || user.Tipe == "Petugas") ?
                                                <Link href={`${baseUrl}/admin/books`}>
                                                    <li className="flex gap-1 items-center">
                                                        <svg className="w-5 h-5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clipRule="evenodd"/>
                                                        </svg>
                                                        <p>Admin Panel</p>
                                                    </li>
                                                </Link>
                                            :
                                                <></>
                                        }
                                        <Link href={`${baseUrl}/api/auth/sign-out`}>
                                            <li className="flex gap-1 items-center">
                                                <svg className="w-5 h-5 text-black"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                                                </svg>
                                                <p>Log out</p>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </Popper>
                        </div>
                    </ClickAwayListener>
            }
        </div>
    )
}