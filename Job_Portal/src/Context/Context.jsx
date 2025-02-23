import React,{createContext,useState} from 'react';
export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [useremail,setuseremail] = useState('');
    const [userskills,setuserskills] = useState([]);
    const [contextindex,setcontextindex] = useState(0);
    const [score,setscore] = useState('');
    return(
        <UserContext.Provider value={{useremail,setuseremail,userskills,setuserskills,contextindex,setcontextindex,score,setscore}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;