"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PreviousDetails {
    company: string,
    position: string,
    role: string,
    joiningDate: string,
    lastDate: string,
    contributions: string
}

interface DetailsProps {
    fullName: string,
    email: string,
    githubUserName: string,
    yearsOfExperience: string,
    portfolioWebsite: string,
    educationDetails: string,
    isPreviousExperience: string,
    previousExperienceDetails: PreviousDetails[]
}

const ResumeBuilder = () => {

    const router = useRouter()
    // const { query } = router

    useEffect(() => {
    })
}