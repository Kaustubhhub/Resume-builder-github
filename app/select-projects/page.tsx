"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [githubProjects, setGithubProjects] = useState<any[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const resumeData = localStorage.getItem("resumeData");
        if (!resumeData) {
            alert("Please fill the data");
            router.push("/");
            return;
        }

        const githubUsername = JSON.parse(resumeData).githubUserName;
        setLoading(true)
        fetchProjects(githubUsername);
        setLoading(false)
    }, []);

    const fetchProjects = async (githubUsername: string) => {
        try {
            const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
            setGithubProjects(response.data);
            console.log('response.data', response.data);
        } catch (error) {
            console.error("Error fetching GitHub projects:", error);
        }
    };

    const handleDragStart = (event: React.DragEvent, project: any) => {
        event.dataTransfer.setData("project", JSON.stringify(project));
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const project = JSON.parse(event.dataTransfer.getData("project"));

        if (selectedProjects.some((p) => p.id === project.id)) {
            alert("This project is already selected.");
            return;
        }

        if (selectedProjects.length >= 4) {
            alert("You can only select a maximum of 4 projects.");
            return;
        }

        setSelectedProjects([...selectedProjects, project]);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const removeProject = (projectId: number) => {
        setSelectedProjects(selectedProjects.filter((p) => p.id !== projectId));
    };

    return (
        <>
            <Navbar />
            {loading &&
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {!loading &&
                <div className="text-xl p-4 flex justify-around items-center bg-gray-50 shadow-md rounded-md border border-gray-200">
                    <div className="flex flex-col gap-4 w-1/2">
                        <h2 className="text-indigo-600 font-semibold">Your Projects</h2>
                        <div className="border p-4 rounded-md bg-white max-h-96 overflow-y-auto">
                            {githubProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="p-2 bg-gray-100 rounded-md shadow-sm cursor-pointer mb-2 hover:bg-gray-200"
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, project)}
                                >
                                    {project.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-4 w-1/2 border-dashed border-2 border-indigo-600 p-4 rounded-md bg-gray-50"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <h2 className="text-gray-700 font-semibold">
                            Selected Projects <span className="text-red-500">(max 4)</span>
                        </h2>
                        <div className="min-h-[150px]">
                            {selectedProjects.length === 0 && (
                                <p className="text-gray-500 text-sm">Drag projects here to select them.</p>
                            )}
                            {selectedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="p-2 bg-indigo-100 rounded-md shadow-sm flex justify-between items-center mb-2"
                                >
                                    <span>{project.name}</span>
                                    <button
                                        onClick={() => removeProject(project.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default Page;
