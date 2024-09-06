"use client";

import { useLoader } from "@/context/LoaderContext";
import React from "react";

const Loader = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="min-h-60 flex flex-col fixed inset-0 z-[99998] bg-overlay items-center justify-center ">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                    <div
                        className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                        role="status"
                        aria-label="loading"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
