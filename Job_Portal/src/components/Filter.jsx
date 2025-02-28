import React, { useEffect, useState, useContext ,useRef} from "react";
import './Filter.css'
import axios from 'axios'
import { UserContext } from "../Context/Context";
function Filter() {
    const [startrange,setstartrange] = useState(0);
    const [endrange,setendrange] = useState(0);

    const {setfilteredlist} = useContext(UserContext);
    const {setsalaryfilterclick} = useContext(UserContext);
    const {setlocationfilter} = useContext(UserContext);
    const {setlocationfilterclick} = useContext(UserContext);
    const [locationclicked,setlocationclicked] = useState('');
    async function salaryfilter(start,end,id){
       try{
        if (start==3 && end==7 && id=='btn1'){
            console.log("First")
            setstartrange(start);
            setendrange(end);
            setsalaryfilterclick(true)
            setlocationfilter(false)
        }
        else if (start==8 && end==10 && id=='btn2'){
            console.log("Second")
            setstartrange(start);
            setendrange(end);
            setsalaryfilterclick(true);
            setlocationfilter(false)
        }
        else if (start==11 && end==15 && id=='btn3'){
            console.log("Third");
            setstartrange(start);
            setendrange(end);
            setsalaryfilterclick(true);
            setlocationfilter(false)
        }
        else if (start==16 && end==20 && id=='btn4'){
            console.log("Four");
            setstartrange(start);
            setendrange(end);
            setsalaryfilterclick(true);
            setlocationfilter(false)
        }
            const result = await axios.get(`http://localhost:5000/salaryfilter?start=${startrange}&end=${endrange}`);
            setfilteredlist(Object.values(result.data));
            console.log(result.data);
       }
       catch(err){
         console.log(err);
       }
    }

    async function locationfilter(location){
        try{
            console.log("Frontend Location",location);
            setlocationclicked(location);
            const result = await axios.post('http://localhost:5000/locationfilter',{
                'Location':locationclicked
            })
            setlocationfilter(Object.values(result.data));
            setlocationfilterclick(true);
            setsalaryfilterclick(false);

            // console.log("Location filter is",result.data)
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        salaryfilter(startrange,endrange)
        locationfilter(locationclicked)
        console.log("Location selected",locationclicked);
    },[startrange,endrange,locationclicked]);
   
    return (
        <div className="filter-parent">
            {/* Apply Filter */}
            <div className="filter">
                Apply Filter
            </div>

            <div className="salaryfilter">
                <div className="button-salary-filter">
                    <div>Salary Filter</div>
                    <button onClick={()=>salaryfilter(3,7,"btn1")}>3 LPA TO 7 LPA</button>
                    <button onClick={()=>salaryfilter(8,10,"btn2")}>8 LPA TO 10 LPA</button>
                    <button onClick={()=>salaryfilter(11,15,"btn3")}>11 LPA TO 15 LPA</button>
                    <button onClick={()=>salaryfilter(16,20,"btn4")}>16 LPA TO 20 LPA</button>
                </div>

                <div className="button-salary-location">
                    <div>Select Location</div>
                    <button className="button-location" onClick={()=>locationfilter("Noida")}>Noida</button>
                    <button className="button-location" onClick={()=>locationfilter("Banglore")}>Banglore</button>
                    <button className="button-location" onClick={()=>locationfilter("Pune")}>Pune</button>
                    <button className="button-location" onClick={()=>locationfilter("Hyderabad")}>Hyderabad</button>
                    <button className="button-location" onClick={()=>locationfilter("Gurgaon")}>Gurgaon</button>
                </div>

                <div className="button-salary-location">
                    <div>Type of Job</div>
                    <button className="button-location">Full Time</button>
                    <button className="button-location">Internship</button>
                </div>
            </div>
        </div>
    )
}
export default Filter