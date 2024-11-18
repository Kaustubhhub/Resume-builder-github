"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [githubProjects, setGithubProjects] = useState<any[]>([]);

    useEffect(() => {
        const resumeData = localStorage.getItem("resumeData");
        if (!resumeData) {
            alert("Please fill the data");
            router.push("/");
            return;
        }

        const githubUsername = JSON.parse(resumeData).githubUserName;

        fetchProjects(githubUsername);
    }, []);

    const fetchProjects = async (githubUsername: string) => {
        try {
            const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
            console.log("data", response.data);
            setGithubProjects(response.data);
        } catch (error) {
            console.error("Error fetching GitHub projects:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="text-xl p-4 flex justify-around  items-center">
                <div className="flex justify-start gap-4 ">
                    Your Projects
                </div>
                <div className=" gap-8 flex justify-end items-center">
                    Selected Projects (max 4)
                </div>
            </div>
        </>
    );
};

export default Page;
