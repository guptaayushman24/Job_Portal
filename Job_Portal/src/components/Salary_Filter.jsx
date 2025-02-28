import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context/Context";
import axios from "axios";
import Pagination from "./Pagination";
import './Salary_Filter.css'
function Threetoseven() {
    const contextdata = useContext(UserContext);
    const [jobscore, setjobscore] = useState(0);
    const { setuserskills } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    // Getting the users skills
    async function getuserskills() {
        try {
            const result = await axios.post('http://localhost:5000/userskills', {
                Email: contextdata.useremail
            })
            setuserskills(result.data.Skills);
        }
        catch (err) {
            console.log(err.message);
        }

    }
    async function checkyourjobscore(index) {
        try {
            const score = await axios.post('http://localhost:5000/check_similarity', {
                userSkills: contextdata.userskills,
                jobDescriptions: contextdata.filteredlist[0][index].JobDescription
            })
            console.log("The score is", score.data.similarityScore);
            setjobscore(score.data.similarityScore);

            if (score.data.similarityScore * 100 >= 40 && score.data.similarityScore * 100 < 50) {
                alert(`You job score is ${score.data.similarityScore * 100} some skills are missing in your skill set according to job description`);
            }
            else if (score.data.similarityScore * 100 >= 50) {
                alert(`Your job score is ${score.data.similarityScore * 100} and you can apply for these job`);
            }
            else {
                alert(`Your job score is ${score.data.similarityScore * 100} and you are not the prefered candidate for these job`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getuserskills();
        checkyourjobscore();
        console.log("Threetoseven Called");
        console.log(contextdata);
        console.log("Threetoseven", contextdata.filteredlist);
        console.log("Threetoseven", typeof (contextdata.filteredlist));
        console.log("Boolean Value",contextdata.salaryfilterclick);
    }, [contextdata.useremail, contextdata.filteredlist,contextdata.salaryfilterclick])
    return (
        <div className="parent-a">
            <div className="alljobs-jobsdetailscards">
                {
                    Array.isArray(contextdata.filteredlist[0]) &&
                    contextdata.filteredlist[0].slice(page * 5 - 5, page * 5).map((jobs, index) => (
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
                    totalPages={Math.ceil((contextdata.filteredlist[0].length) / itemPerPage)}
                    setPage={setPage}
                ></Pagination>
            </div>
        </div>
    )

}
export default Threetoseven;