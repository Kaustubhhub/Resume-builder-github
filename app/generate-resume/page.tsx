"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

const Page = () => {
    const router = useRouter();
    const [resumeInfo, setResumeInfo] = useState(null); // Initialize with null

    useEffect(() => {
        console.log("hi from useEffect");
        const resumeData = localStorage.getItem("resumeData");
        if (!resumeData) {
            alert("Please fill the information.");
            router.push("/");
            return;
        }
        setResumeInfo(JSON.parse(resumeData));
    }, []);

    // If resumeInfo is null, show the loading indicator
    if (!resumeInfo) {
        return <div>Loading...</div>;
    }

    // Extract the GitHub username (if provided in resumeInfo)
    const githubUsername = resumeInfo.githubUserName || ""; // Use a fallback empty string

    return (
        <div>
            <h1>{resumeInfo?.fullName || "Anonymous"}</h1>
            <GitHubCalendar username={githubUsername} colorScheme="light" />
        </div>
    );
};

export default Page;
