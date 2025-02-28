import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context/Context";
import axios from "axios";
import Pagination from "./Pagination";
import './Job_Type.css'

function JobType(){
    const contextdata = useContext(UserContext);
    const [jobscore, setjobscore] = useState(0);
    const { setuserskills } = useContext(UserContext);
    const {jobtypefilter} = useContext(UserContext);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    useEffect(()=>{
        console.log("Job_Type data",contextdata.jobtypefilter);
    },[contextdata.useremail, contextdata.jobtypefilter])
    return(
    <div className="parent-a">
            <div className="alljobs-jobsdetailscards">
                {
                    Array.isArray(contextdata.jobtypefilter[0]) &&
                    contextdata.jobtypefilter[0].slice(page * 5 - 5, page * 5).map((jobs, index) => (
                        <div className="alljobs-parent" key={index}>
                            <div className="alljobs-cards">
                                <div className="alljobs-details">
                                    <div>Company Name:- {jobs.CompanyName}</div>
                                    <div>Salary:- {jobs.Salary} Lakh</div>
                                    <div>Location:- {jobs.Location}</div>
                                    <div>Type Of Job:- {jobs.TypeofJob}</div>
                                </div>
                                <div className="alljobs-buttons">
                                    <div className="alljobs-scorebutton">
                                        <button onClick={() => checkyourjobscore(index)}>Check Your Job Score</button>
                                    </div>
                                    <div className="alljobs-apply">
                                        <button>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div>
                <Pagination
                    page={page}
                    totalPages={Math.ceil((contextdata.jobtypefilter[0].length) / itemPerPage)}
                    setPage={setPage}
                ></Pagination>
            </div>
        </div>
   
    )

}
export default JobType;