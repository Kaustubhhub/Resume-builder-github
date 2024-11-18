"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const router = useRouter()
    const [resumeInfo, setResumeInfo] = useState({})
    useEffect(() => {
        console.log("hi from use effect")
        const resumeData = localStorage.getItem("resumeData")
        if (!resumeData) {
            alert("Please fill the information.")
            router.push("/")
            return
        }
        console.log(JSON.parse(resumeData))
        setResumeInfo(JSON.parse(resumeData))
    }, []);

    return <div>{JSON.stringify(resumeInfo)}</div>;
};

export default Page;
