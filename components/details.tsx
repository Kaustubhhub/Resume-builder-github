"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PreviousDetails {
    company: string,
    position: string,
    role: string,
    joiningDate: string,
    lastDate: string,
    contributions: string
}

const Details = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [githubUserName, setGithubuserName] = useState<string>("")
    const [yearsOfExperience, setYearsOfExperience] = useState<string>("")
    const [portfolioWebsite, setPortfolioWebsite] = useState<string>("")
    const [educationDetails, setEducationDetails] = useState<string>("")
    const [isPreviousExperience, setIsPreviousExperience] = useState<boolean>(false)
    const [previousExperienceDetails, setPreviousExperienceDetails] = useState<PreviousDetails[]>([{
        company: "",
        position: "",
        role: "",
        joiningDate: "",
        lastDate: "",
        contributions: ""
    }])

    const handleSubmit = () => {
        const formData = {
            fullName,
            email,
            githubUserName,
            yearsOfExperience,
            portfolioWebsite,
            educationDetails,
            isPreviousExperience,
            previousExperienceDetails
        }
        localStorage.setItem("resumeData", JSON.stringify(formData));
        router.push("/generate-resume");
    }

    const handleInputChange = (index: number, field: string, value: string) => {
        setPreviousExperienceDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value
            };
            return updatedDetails;
        });
    };


    const addNewRowToPreviousExperience = () => {
        const newPreviousExperience = [
            ...previousExperienceDetails,
            {
                company: "",
                position: "",
                role: "",
                joiningDate: "",
                lastDate: "",
                contributions: ""
            }
        ];

        setPreviousExperienceDetails(newPreviousExperience);

    }

    return (
        <>
            <form className="mx-[290px]">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
                        <input
                            onChange={(e) => setFullName(e.target.value)}
                            type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="eg: John" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="eg: johndoe@xyz.com" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Github username</label>
                        <input
                            onChange={(e) => setGithubuserName(e.target.value)}
                            type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="eg: username" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Years of experience</label>
                        <input
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                            type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="eg: 4" required />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900">Portfolio website</label>
                    <input
                        onChange={(e) => setPortfolioWebsite(e.target.value)}
                        type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="https://vanholtz.co/" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Education details</label>
                    <textarea
                        onChange={(e) => setEducationDetails(e.target.value)}
                        id="message"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder={`Btech in Computer science from Mumbai University`}
                    ></textarea>
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            onChange={(e) => setIsPreviousExperience(e.target.checked)}
                            id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-900">Do you have any previous <a href="#" className="text-blue-600 hover:underline">work experience</a>.</label>
                </div>

                {isPreviousExperience &&
                    previousExperienceDetails.map((detail, index) => (
                        <div key={index} className="border rounded-lg mb-5">
                            <div className="mx-5 my-4">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Company</label>
                                    <input
                                        onChange={(e) =>
                                            handleInputChange(index, 'company', e.target.value)
                                        }
                                        type="text"
                                        value={detail.company}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="eg: Google"
                                        required
                                    />
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Position</label>
                                        <input
                                            onChange={(e) =>
                                                handleInputChange(index, 'position', e.target.value)
                                            }
                                            type="text"
                                            value={detail.position}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="eg: Sr. Software Engineer"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                                        <input
                                            onChange={(e) =>
                                                handleInputChange(index, 'role', e.target.value)
                                            }
                                            type="text"
                                            value={detail.role}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="eg: Backend Engineer"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Joining date</label>
                                        <input
                                            onChange={(e) =>
                                                handleInputChange(index, 'joiningDate', e.target.value)
                                            }
                                            type="text"
                                            value={detail.joiningDate}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="eg: 12/4/2020"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Last date</label>
                                        <input
                                            onChange={(e) =>
                                                handleInputChange(index, 'lastDate', e.target.value)
                                            }
                                            type="text"
                                            value={detail.lastDate}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="eg: 12/4/2024"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Your contributions</label>
                                    <textarea
                                        onChange={(e) =>
                                            handleInputChange(index, 'contributions', e.target.value)
                                        }
                                        value={detail.contributions}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                        placeholder="Work you have done in the project."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    ))}


                {isPreviousExperience &&
                    <button
                        onClick={addNewRowToPreviousExperience}
                        type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add more</button>
                }
            </form>
            <div className="flex justify-center mt-10 mx-[290px] items-center mb-10">
                <button
                    onClick={handleSubmit}
                    type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full py-2.5 text-center">Generate resume</button>
            </div>
        </>
    );
};

export default Details;
