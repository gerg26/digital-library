import React from 'react';
import LandingPageLayout from '../Layouts/LandingPageLayout'
import TopNavigation from '../../Components/LandingPage/TopNavigation';
import BookSearchBar from '../../Components/LandingPage/BookSearchBar';
import BookSearchButton from '../../Components/LandingPage/BookSearchButton';
import PrimaryButton from '../../Components/Shared/PrimaryButton';
import { router } from '@inertiajs/react';

export default function LandingPage() {
    // gets baseurl
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // handles search click
    const handleSearch = (ev) => {
        // prevents default
        ev.preventDefault();

        // gets search keyword
        const searchKeyword = new FormData(ev.target).get('search-keyword')

        // visit
        router.visit(`${baseUrl}/book/list/${searchKeyword}`)

        // returns
        return false;
    }

    // returns
    return (
        <LandingPageLayout>
            <TopNavigation/>
            <div className='book-container'>
                <form className='book-search-container' onSubmit={handleSearch}>
                    <BookSearchBar name="search-keyword"/>
                    <BookSearchButton type="submit"/>
                </form>
                <PrimaryButton link="book/list" text="Browse"/>
            </div>
        </LandingPageLayout>
    )
}