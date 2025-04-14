import './Main_Page.css'
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/Context";
import Filter from "./Filter";
import AllJobs from "./AllJobs";
import Threetoseven from "./Salary_Filter";
import LocationFilter from "./Location_Filter";
import JobType from "./Job_Type";
function MainPage() {
    const [page, setPage] = useState(1);
    const contextdata = useContext(UserContext);
    const [userskills, setuserskills] = useState([]);
    const [jobscore, setjobscore] = useState(0);
    const { setalldata } = useContext(UserContext);
    const [data,setdata] = useState([]);
    const navigate = useNavigate();
    console.log("All data", contextdata.alldata)
    async function showalljobs() {
        const data = await axios.get('http://localhost:5000/alljobs',{
            withCredentials:true
        });
        console.log(typeof (data.data.Job_Data));
        setalldata(data.data.Job_Data);
        setdata(data.data.Job_Data);
    }
    function selectPageHandler(selectedPage) {
        console.log(selectedPage);
        if (selectedPage >= 1 && selectedPage <= contextdata.alldata.length / 5 && selectedPage != page) {
            setPage(selectedPage);
        }

    }
    async function logout(){
        await axios.post('http://localhost:5000/logout',{

        },{
            withCredentials:true
        })
        navigate('/');
    }
    async function recommendedjobs(){
        showalljobs();
        console.log("The email address logged in",contextdata.useremail)
        console.log("The skills are",contextdata.userskills)
        const userskills = contextdata.userskills;
        console.log("The length of the data is",contextdata.alldata);
        console.log("The description",contextdata.alldata[0].JobDescription);
        for (let i=contextdata.alldata.length-1;i>=0;i--){
            console.log("Value of i is",i);
            const score = await axios.post('http://localhost:5000/recommendedjob',{
                userSkills:userskills,
                jobDescriptions:contextdata.alldata[i].JobDescription
            })
            if (score.data.similarityScore*100>=40 ){
                await axios.post('http://localhost:5000/saverecommendedjob',{
                    Email:contextdata.useremail,
                    JobTitle:contextdata.alldata[i].JobTitle,
                    JobDescription:contextdata.alldata[i].JobDescription,
                    SkillsRequired:contextdata.alldata[i].SkillsRequired,
                    Salary:contextdata.alldata[i].Salary,
                    Location:contextdata.alldata[i].Location,
                    TypeofJob:contextdata.alldata[i].TypeofJob
                })
                console.log("A new job is added according to your skills")
                console.log(contextdata.alldata[i].JobDescription)
            }
        }

        alert("Recommended Jobs")
    }
    function showrecommendedjobs (){
       navigate('/recommendedjob');
    }
    function prepareforhrinterview() {
        navigate('/hrinterview');
    }

    return (
        <>
            <div className="alljobs-main-header">

                <div className="alljobs-heading-parent">
                    <div>
                        Explore Jobs
                    </div>
                    <div className="hrandlogout">
                        <button onClick={prepareforhrinterview}>Prepare for the HR Interview</button>
                        <button className="logout"onClick={recommendedjobs}>Check Recommended Jobs</button>
                        <button className="logout"onClick={showrecommendedjobs}>Recommended Jobs</button>
                        <button className="logout"onClick={logout}>Log Out</button>
                    </div>
                </div>




                <div className="filterandjoddetails">
                    <div className="alljobs-filters">
                        <Filter></Filter>

                    </div>

                    <div className="alljobs-jobsetails">

                        <>
                            {contextdata.salaryfilterclick && !contextdata.locationfilterclick ? (
                                <Threetoseven />
                            ) : contextdata.locationfilterclick && !contextdata.salaryfilterclick ? (
                                <LocationFilter />
                            ) : contextdata.jobtypeclicked && !contextdata.salaryfilterclick && !contextdata.locationfilterclick ? (
                                <JobType />
                            ) : (
                                <AllJobs />
                            )}
                        </>

                    </div>
                </div>

            </div>
        </>
    )
}
export default MainPage;