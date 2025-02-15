import React,{createContext,useState} from 'react';
export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [useremail,setuseremail] = useState('');
    const [userskills,setuserskills] = useState([]);
    return(
        <UserContext.Provider value={{useremail,setuseremail,userskills,setuserskills}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;