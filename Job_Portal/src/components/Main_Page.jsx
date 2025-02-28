import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/Context";
import Filter from "./Filter";
import AllJobs from "./AllJobs";
import './Main_Page.css'
import Threetoseven from "./Salary_Filter";
import LocationFilter from "./Location_Filter";
import JobType from "./Job_Type";
function MainPage() {
    const [page, setPage] = useState(1);
    const contextdata = useContext(UserContext);
    const [userskills, setuserskills] = useState([]);
    const [jobscore, setjobscore] = useState(0);
    const { setalldata } = useContext(UserContext);
    const navigate = useNavigate();
    console.log("All data", contextdata.alldata)
    async function showalljobs() {
        const data = await axios.get('http://localhost:5000/alljobs');
        console.log(typeof (data.data.Job_Data));
        setalldata(data.data.Job_Data);
    }
    function selectPageHandler(selectedPage) {
        console.log(selectedPage);
        if (selectedPage >= 1 && selectedPage <= contextdata.alldata.length / 5 && selectedPage != page) {

            setPage(selectedPage);
        }

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
                    <div>
                        <button onClick={prepareforhrinterview}>Prepare for the HR Interview</button>
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