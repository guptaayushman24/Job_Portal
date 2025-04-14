import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/Context";
import axios from 'axios';
import './Recommended_Job.css';

function RecommendedJob() {
  const contextdata = useContext(UserContext);
  const [saverecommendedjob, Setsaverecommendedjob] = useState([]);

  async function showallrecommendedjobs() {
    try {
      console.log(contextdata.useremail);
      const response = await axios.post('http://localhost:5000/getallrecommendedjobs', {
        email: contextdata.useremail
      });
      Setsaverecommendedjob(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showallrecommendedjobs();
  }, []);

  useEffect(() => {
    console.log("The jobs are", saverecommendedjob);
    console.log(typeof saverecommendedjob);
  }, [saverecommendedjob]);

  const jobs = Object.values(saverecommendedjob).flat();
  console.log("The jobs is",jobs);

  return (
    <div className="job-container">
    {jobs.map((job, index) => (
      <div key={index} className="job-card">
        <h2>{job.JobTitle}</h2>
        <p><strong>Description:</strong> {job.JobDescription}</p>
        <p><strong>Skills:</strong> {job.SkillsRequired}</p>
        <p><strong>Type:</strong> {job.TypeofJob}</p>
        <p><strong>Salary:</strong> ₹{job.Salary} LPA</p>
        <p><strong>Contact:</strong> {job.Email}</p>
      </div>
    ))}
  </div>
  );
}

export default RecommendedJob;
