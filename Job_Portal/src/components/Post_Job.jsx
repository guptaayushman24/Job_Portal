import React, { useState } from "react";
import './Post_Job.css'
import axios from 'axios'
function Post_Job() {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [skillsRequired, setSkillsRequired] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [typeOfJob, setTypeOfJob] = useState("FullTime");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            companyName,
            jobTitle,
            jobDescription,
            skillsRequired,
            salary,
            location,
            typeOfJob
        });
        alert("Job Posted Successfully!");
    };
    async function postjob(){
        try{
            const data = await axios.post('http://localhost:5000/postjob',{
                CompanyName:companyName,
                JobTitle:jobTitle,
                JobDescription:jobDescription,
                SkillsRequired:skillsRequired,
                Salary:salary,
                Location:location,
                TypeofJob:typeOfJob
            })
            console.log(data);
            alert("Job Posted")
        }
        catch(err){
            console.log(err);
        }
        
    }
    return (
        <div className="job-form-container">
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="job-input-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Job Title</label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Job Description</label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Skills Required</label>
                    <input
                        type="text"
                        value={skillsRequired}
                        onChange={(e) => setSkillsRequired(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Salary</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="job-input-group">
                    <label>Type of Job</label>
                    <select
                        value={typeOfJob}
                        onChange={(e) => setTypeOfJob(e.target.value)}
                        required
                    >
                        <option value="FullTime">Full-Time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <button type="submit" className="job-submit-btn" onClick={postjob}>Post Job</button>
            </form>
        </div>
    );
}

export default Post_Job;
