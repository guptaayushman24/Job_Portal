import { React, useCallback, useContext, useEffect, useState } from "react"
import './Profile_Page.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faUser, faCalendar, faEye, faPen, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile_Page() {
    const data = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setopen] = useState(false);
    const [skillsarray, setskillsarray] = useState(new Set());
    const [skills, setskills] = useState('');
    const [jobtype,setjobtype] = useState('');
    const [preferedlocation,setpreferedlocation] = useState('');

    function openinputtext() {
        setopen(!open);
        // Remove leading and trailing spaces
        const trimmedSkill = skills.trim();

        if (trimmedSkill !== '') {
            // Only add the skill if it's not empty
            const updatedSkills = new Set(skillsarray);
            updatedSkills.add(trimmedSkill);

            // Update the state
            setskillsarray(updatedSkills);
        }

        // Clear the input field
        setskills('')
    }

    // Submits the profile data
    async function submitprofile() {
        try {
            if (skillsarray.size === 0) {
                alert("Please add at least one skill before submitting.");
                return;
            }

            // Convert Set to Array for sending to the backend
            const skillsArrayToSubmit = Array.from(skillsarray);
            console.log("Array is", skillsArrayToSubmit);

            await axios.post('http://localhost:5000/userprofile', {
                Email: data.useremail,
                Skills: skillsArrayToSubmit,
                JobType: jobtype && jobtype.trim() !== '' ? jobtype : 'Job',
                PreferedLocation: preferedlocation && preferedlocation.trim() !== '' ? preferedlocation : 'Banglore',
            });

            alert("Profile updated successfully!");
            navigate('/alljobs');
            
        } catch (err) {
            console.error("Error while submitting profile:", err);
        }
    }
    function selectjobtype() {
        alert("Hello")
    }
    useEffect(() => {
        console.log(data);
        console.log(jobtype);
        console.log(preferedlocation);
    })
    return (
        <>
            <div className="pp-parent">
                <div className="pp-heading">
                    Compete Your profile to proceed further
                </div>

                {/* First Card*/}
                <div className="pp-careerpreference">
                    <div className="pp-careerpreference-skill">
                        Add your skills
                        <div className="pen-icon"><FontAwesomeIcon icon={faPen} onClick={openinputtext}></FontAwesomeIcon>
                            {
                                open && (
                                    <input type="text" className="inputstyle" onChange={(e) => setskills(e.target.value)}></input>
                                )
                            }
                        </div>
                    </div>

                    <div className="user-skills">
                        {
                            !open && (
                                <div className="skills-div">
                                    {Array.from(skillsarray).map((skill, index) => (
                                        <div style={{ marginInline: '0.5rem' }} key={index}>{skill}</div>
                                    ))}
                                </div>
                            )
                        }
                    </div>

                </div>

                {/*Second Card*/}
                <div className="pp-careerpreference">
                    <div className="pp-careerpreference-secondcard">
                    Career Preference
                    </div>

                    <div className="pp-careerpreference-secondcard">
                        <div>Prefered Job Type</div>    
                                <>
                                <label for="cars">Choose Job Type:</label><select name="jobtype" id="jobtype" onChange={(e)=>setjobtype(e.target.value)}>
                                    <option value="Job">Job</option>
                                    <option value="Internship">Internship</option>
                                </select>
                                </>
                    </div>

                    <div className="pp-careerpreference-secondcard">
                    Career Preference
                    </div>

                    <div className="pp-careerpreference-secondcard">
                        <div>Prefered Location</div>    
                                <>
                                <label for="Banglore">Choose Prefered Location:</label><select name="location" id="location" onChange={(e)=>setpreferedlocation(e.target.value)}>
                                    <option value="Banglore">Banglore</option>
                                    <option value="Gurgaon">Gurgaon</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Noida">Noida</option>
                                    <option value="Pune">Pune</option>
                                </select>
                                </>
                    </div>
                </div>

                <div className="profile-page-submitprofile">
                    <button onClick={submitprofile}>Submit Profile</button>
                </div>
            </div>
        </>
    )
}
export default Profile_Page;