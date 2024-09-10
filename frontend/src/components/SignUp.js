/*
import axios from "axios";
import { useRef, useState } from "react";
import {  toast, ToastContainer } from "react-toastify";
import WebApis from "../apis/WebApis";
import {useNavigate } from "react-router-dom";

export default function SignUp(){
        let imageRef = useRef();
        const [upload, setUpload] = useState();
        // Create refs for the form inputs
        const emailInput = useRef(null);
        const passwordInput = useRef(null);
        const contactInput = useRef(null);
        const setImage = ()=>{
            setUpload(imageRef.current.files[0]);
        }
        const navigate = useNavigate();


        // Handle form submission
        const signUpUser = async (event)=>{
            event.preventDefault(); // Prevent the default form submission behavior

            let formData = new FormData();
            formData.append("profile",upload);
            //Retrieve values from refs
            const email = emailInput.current.value;
            const password = passwordInput.current.value;
            const contact = contactInput.current.value;
            

            try{
                //Send a POST request to the backend API
                const response = await axios.post(WebApis.SIGN_UP, {email,password,contact},formData);
                console.log(response.data);
                navigate("/sign-in");
            }
            catch(err){
                console.log(err);
                toast.error("Kindly enter valid email or password.")
            }
    }
    return <>
        <ToastContainer/>
        <div className="container d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
            <div className="sign-in-form" style={{width:"30%", boxShadow:"5px 5px 5px 5px grey"}}>
                <h5 className="bg-dark text-white text-center p-2">Sign Up</h5>
                <form onSubmit={signUpUser} className="p-3 d-flex flex-column align-items-center">
                    <input ref={emailInput} type="text" placeholder="Write your email" className="mt-2 form-control"/>
                    <input ref={passwordInput} type="password" placeholder="Write your password" className="mt-2 form-control"/>
                    <input ref={contactInput} type="number" placeholder="Write your contact" className="mt-2 form-control"/>
                    <input ref={imageRef} onChange={setImage}  type="file" className="form-control"/>
                    <button type="submit" className="btn btn-danger mt-2" style={{width:"100%"}}>Sign Up</button>
                    <small className="text-primary mt-2" style={{cursor:"pointer"}}>Already have an account.<a>Sign In</a></small>
                </form>
            </div>
        </div>
    </>
}
*/


import axios from "axios";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import WebApis from "../apis/WebApis";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    let imageRef = useRef();
    const [upload, setUpload] = useState();
    
    // Create refs for the form inputs
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const contactInput = useRef(null);
    
    const setImage = () => {
        setUpload(imageRef.current.files[0]);
    }
    
    const navigate = useNavigate();

    // Handle form submission
    const signUpUser = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        let formData = new FormData();
        formData.append("profile", upload);
        // Retrieve values from refs
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        const contact = contactInput.current.value;
        
        formData.append("email", email);
        formData.append("password", password);
        formData.append("contact", contact);
        
        try {
            // Send a POST request to the backend API
            const response = await axios.post(WebApis.SIGN_UP, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate("/sign-in");
        } catch (err) {
            console.log(err);
            toast.error("Kindly enter valid email or password.");
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <div className="sign-in-form" style={{ width: "30%", boxShadow: "5px 5px 5px 5px grey" }}>
                    <h5 className="bg-dark text-white text-center p-2">Sign Up</h5>
                    <form onSubmit={signUpUser} className="p-3 d-flex flex-column align-items-center">
                        <input ref={emailInput} type="text" placeholder="Write your email" className="mt-2 form-control" />
                        <input ref={passwordInput} type="password" placeholder="Write your password" className="mt-2 form-control" />
                        <input ref={contactInput} type="number" placeholder="Write your contact" className="mt-2 form-control" />
                        <input ref={imageRef} onChange={setImage} type="file" className="form-control" />
                        <button type="submit" className="btn btn-danger mt-2" style={{ width: "100%" }}>Sign Up</button>
                        <small className="text-primary mt-2" style={{ cursor: "pointer" }}>Already have an account.<a href="/sign-in">Sign In</a></small>
                    </form>
                </div>
            </div>
        </>
    )
}
