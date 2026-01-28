import React from "react";

export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto p-6 py-12 flex flex-col items-center justify-center min-h-[500px]">
            <span className="spinner"></span>
            
            <p className="mt-4 text-main font-bold text-lg animate-pulse">
                Loading...
            </p>
        </div>
    );
}