import React, { useLayoutEffect, useState } from "react";
export default function BookCover({name, image, update}) {
    // use state cover image
    const [coverImage, setCoverImage] = useState(null);

    // sets coverImage if image not null
    if(image != null) {
        useLayoutEffect(() => {
            setCoverImage(image);
        }, [])
    }

    // handles input onchange
    function handleChange(ev) {
        // gets files
        const files = ev.target.files;

        // ensure files > 0
        if(files.length < 1) {
            return;
        }

        // revoke current cover image if not null
        if(coverImage != null) {
            window.URL.revokeObjectURL(coverImage);
        }

        // set cover image
        const coverImageUrl = window.URL.createObjectURL(files[0]);
        setCoverImage(coverImageUrl);
    }

    // returns
    return (
        <div className="select-none border-black h-full border-2 border-dashed rounded-lg  flex flex-col justify-center items-center">
            <label className="w-full h-full">
                <input name={name} onChange={handleChange} className="hidden" accept="image/*" type="file"/>
                <div className="flex flex-col justify-center items-center h-full w-full">
                {
                    coverImage == null ?
                        <div className="flex flex-col justify-center items-center h-full w-full p-3">
                            <svg className="w-16 h-16 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 3c.3 0 .6.1.8.4l4 5a1 1 0 1 1-1.6 1.2L13 7v7a1 1 0 1 1-2 0V6.9L8.8 9.6a1 1 0 1 1-1.6-1.2l4-5c.2-.3.5-.4.8-.4ZM9 14v-1H5a2 2 0 0 0-2 2v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-xs lg:text-sm mt-3">Klik untuk menambahkan cover</p>
                        </div> :
                        <img 
                            src={
                                image == null ?
                                    `${coverImage}?update=${update}`
                                : 
                                coverImage
                            } 
                            className="object-cover w-full h-full rounded-lg"
                        />
                }
                </div>
            </label>
        </div>
    )
}