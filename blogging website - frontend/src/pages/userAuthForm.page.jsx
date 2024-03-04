import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from '../imgs/google.png';
import AnimationWrapper from "../common/page-animation";


const UserAuthForm = ({ type }) => {
    return (
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
                <form className="w-[80%] max-w-[400px]">
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
                    <button className="btn-dark center mt-14" type="submit">
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