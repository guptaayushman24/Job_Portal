import React, { useEffect, useState, useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/Context";
import Pagination from "./Pagination";
import './AllJobs.css'
import './Pagination.css'
function AllJobs() {
    const [alldata, setalldata] = useState([]);
    const [page, setPage] = useState(1);

    // const [userskills, setuserskills] = useState([]);
    const [jobscore, setjobscore] = useState(0);
    const navigate = useNavigate();
    // const {setalldata} = useContext(UserContext);
    const {setuserskills} = useContext(UserContext);
    const contextdata = useContext(UserContext);
    const itemPerPage = 5;
    async function showalljobs() {
        const data = await axios.get('http://localhost:5000/alljobs',{
            withCredentials:true
        });
        console.log(data.data);
        setalldata(Object.values(data.data.Job_Data));
    }

    // Getting the users skills
    async function getuserskills() {
        try {
            const result = await axios.post('http://localhost:5000/userskills', {
                Email:contextdata.useremail
            },{
                withCredentials:true
            })
            // console.log("User skills are",result);
            // console.log("Email address from the context is",contextdata.useremail);
            setuserskills(result.data.Skills);
        }
        catch (err) {
            console.log(err.message);
        }

    }
    async function checkyourjobscore(index){
             try {
            const score = await axios.post('http://localhost:5000/check_similarity', {
                userSkills: contextdata.userskills,
                jobDescriptions: alldata[index].JobDescription
            })
            if (jobscore==null){
                alert("Please wait for the result");
            }
            else{
                alert("The job score is",jobscore);
            }
           
            if (score.data.similarityScore*100>=40 && score.data.similarityScore*100<50){
                alert(`You job score is ${score.data.similarityScore*100} some skills are missing in your skill set according to job description`);
            }
            else if (score.data.similarityScore*100>=50){
                alert(`Your job score is ${score.data.similarityScore*100} and you can apply for these job`);
            }
            else{
                alert(`Your job score is ${score.data.similarityScore*100} and you are not the prefered candidate for these job`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getuserskills();
        checkyourjobscore()
        showalljobs();
    }, [contextdata.useremail]);
    return (
        <div className="parent-a">
            <div className="alljobs-jobsdetailscards">


                {
                    alldata.slice(page * 5 - 5, page * 5).map((jobs, index) => {
                        return (
                            <div className="alljobs-parent">
                                <div className="alljobs-cards">
                                    <div className="alljobs-details">
                                        <div>Company Name:- {jobs.CompanyName}</div>
                                        <div>Salary:- {jobs.Salary}{" "}{"Lakh"}</div>
                                        <div>Location:- {jobs.Location}</div>
                                        <div>Type Of Job:- {jobs.TypeofJob}</div>
                                    </div>
                                    <div className="alljobs-buttons">
                                        <div className="alljobs-scorebutton">
                                            <button onClick={()=>checkyourjobscore(index)}>Check Your Job Score</button>
                                        </div>
                                        <div className="alljobs-apply">
                                            <button>Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
                
            </div>
            <div>
                <Pagination
                    page={page}
                    totalPages={Math.ceil((alldata.length) / itemPerPage)}
                    setPage={setPage}
                ></Pagination>
                </div>
        </div>


    )
}
export default AllJobs;
