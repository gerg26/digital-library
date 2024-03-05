import React from "react";

export default function Reviews({reviews}) {
    return (
        <div className="space-y-3">
            {
                reviews.map(review => {
                    return <div key={review.UlasanID} className="flex gap-5">
                        <div className="flex flex-col justify-center items-center">
                            <svg className="w-16 h-16 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                            </svg>
                            <p>{review?.user?.NamaLengkap}</p>
                        </div>
                        <div className="max-w-[60%] break-words">
                            <p className="italic font-light">{review?.Ulasan}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}