import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from '../imgs/google.png';
import AnimationWrapper from "../common/page-animation";
import { useRef } from "react";
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';


const UserAuthForm = ({ type }) => {
    

    const userAuthThorughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            console.log(data)
        })
        .catch(({response}) => {
            // console.log(response.data.error)
            toast.error(response.data.error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == 'sign-in' ? '/signin' : '/signup';
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // form data
       let form = new  FormData(formElement)
        let formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        const { fullname, email, password } = formData;
        // validating the data from frontend
        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("Fullname must be at least 3 letter long")
            }
        }
        if (!email.length) {
            return toast.error("Enter Email")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
        }

        userAuthThorughServer(serverRoute, formData);


    }
    return (
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
                <Toaster />
                <form id="formElement" className="w-[80%] max-w-[400px]">
                    {/* title */}
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                        {type == "sign-in" ? "Welcome back" : "Join us today"}
                    </h1>

                    {/* input parts */}
                    {
                        type != "sign-in" ?
                            <InputBox name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            /> : ""
                    }
                    {/* email inoput */}
                    <InputBox name="email"
                        type="email"
                        placeholder="Email"
                        icon="fi-rr-envelope"
                    />

                    {/* password input */}
                    <InputBox name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-rr-key"
                    />
                    {/* submit button */}
                    <button onClick={handleSubmit} className="btn-dark center mt-14" type="submit">
                        {type.replace("-", " ")}
                    </button>
                    {/* seperator horizontal line */}
                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>
                    {/* social login button */}
                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5" alt="" />
                        Continue with google
                    </button>
                    {/* redirect links form signin to signup or vice versa */}
                    {
                        type == "sign-in" ?
                            <p className="mt-6 test-dark-grey text-xl text-center">
                                Don't have an account?
                                <Link to='/signup' className="underline text-black text-xl ml-1">Sign up here.</Link>
                            </p> :
                            <p className="mt-6 test-dark-grey text-xl text-center">
                                Already a member?
                                <Link to='/signin' className="underline text-black text-xl ml-1">Sign in here.</Link>
                            </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    );
};

export default UserAuthForm;