import React,{createContext,useState} from 'react';
export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [useremail,setuseremail] = useState('');
    const [userskills,setuserskills] = useState([]);
    const [contextindex,setcontextindex] = useState(0);
    const [score,setscore] = useState('');
    const [filteredlist,setfilteredlist] = useState([]);
    const [locationfilter,setlocationfilter] = useState([]);
    const [alldata,setalldata] = useState([]); 
    const [salaryfilterclick,setsalaryfilterclick] = useState(false);
    const [locationfilterclick,setlocationfilterclick] = useState(false);
    return(
        <UserContext.Provider value={{useremail,setuseremail,userskills,setuserskills,contextindex,setcontextindex,score,setscore,
        filteredlist,setfilteredlist,salaryfilterclick,setsalaryfilterclick,alldata,setalldata,locationfilter,setlocationfilter,locationfilterclick,setlocationfilterclick}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;