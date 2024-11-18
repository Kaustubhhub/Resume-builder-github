"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {

    const router = useRouter()

    useEffect(() => {
        console.log("hi from use effect")
        const resumeData = localStorage.getItem("resumeData")
        console.log('resumeData', resumeData);
        if (!resumeData) {
            alert("Please fill the information.")
            router.push("/")
        }
    }, []);

    return <div>Hi from generate resume</div>;
};

export default Page;
