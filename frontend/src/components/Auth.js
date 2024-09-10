import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export default function Auth({children}){
    const {isLoggedIn} = useSelector((store)=>store.User);
    if(isLoggedIn)
        return children;
    return <Navigate to="/sign-in"/>
}