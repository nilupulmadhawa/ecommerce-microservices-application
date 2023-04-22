import React from 'react'

export default function FeedLoading() {
    return (
        <div className="relative w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg mb-5">
            <div className="animate-pulse flex flex-col">
                <div className="rounded aspect-square w-full bg-gray-200"></div>

                <div className="flex items-center my-5">
                    <div className="flex justify-between w-full mx-3">
                        <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
                        <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
                        <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
