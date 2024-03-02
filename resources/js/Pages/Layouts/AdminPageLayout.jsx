import React from "react";
import HamburgerMenu from "../../Components/Shared/HamburgerMenu";
import UserButton from "../../Components/Shared/UserButton";
import SidebarItem from "../../Components/Shared/SidebarItem";

function TopBar({user}) {
    return <div className="flex items-center justify-end h-full px-3">
        <UserButton user={user}/>
    </div>
}

const SideBarMenu = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <div className="space-y-6">
            <SidebarItem link={`${baseUrl}/admin/books`} icon={
                <svg className="w-10 h-10 sm:w-12 sm:h-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                </svg>
            } text={"Books"}/>
            <SidebarItem link={`${baseUrl}/admin/book-categories`} icon={
                <svg className="w-10 h-10 sm:w-12 sm:h-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                </svg>
            } text={"Book Categories"}/>
            <SidebarItem link={`${baseUrl}/admin/borrowed-books`} icon={
                <svg className="w-10 h-10 sm:w-12 sm:h-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd"/>
                </svg>
            } text={"Borrowed Books"}/>
            <SidebarItem link={`${baseUrl}/admin/users`} icon={
                <svg className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                </svg>
              
            } text={"Users"}/>
        </div>
    )
}

export default function AdminPageLayout({children, user}) {    
    return (
        <HamburgerMenu sidebar={SideBarMenu()} topBar={TopBar({user: user})}>
            {children}        
        </HamburgerMenu>
    );
}