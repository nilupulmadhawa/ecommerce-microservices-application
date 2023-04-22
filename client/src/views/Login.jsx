import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser, setToken, setLoading } = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        // axiosClient
        //     .post("/login", payload)
        //     .then(({ data }) => {
        //         setLoading(false);
        //         setUser(data.user);
        //         setToken(data.token);
        //         toast.success("Login successfully");
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             toast.error(response.data.message);
        //             // setMessage(response.data.message);
        //         }
        //     });
    };

    return (
        <>
            <section className="h-screen items-center">
                <div className=" sm:m-10  h-screen items-center flex   m-auto">
                    <div className="flex justify-center flex-wrap g-6 text-gray-800 sm:shadow sm:rounded-lg w-9/12 m-auto justify-center ">
                        {/* title sign up */}
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            {/* logo in left side */}
                            {/* lg:py-0 md:py-5 sm:py-5 md:justify-left md:absolute md:top-10 sm:justify-left sm:absolute sm:top-10 */}
                            <div className="flex lg:pb-10 ">
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="w-1/2 object-cover pt-5"
                                />
                            </div>
                            <form onSubmit={onSubmit} className="sm:w-3/4 h-full">
                                {message && (
                                    <div className="alert">
                                        <p>{message}</p>
                                    </div>
                                )}
                                <div className="text-gray-600 text-3xl text-left mb-5 font-bold">
                                    <h1>SIGN IN</h1>
                                </div>
                                <div className="mb-6">
                                    <label
                                        for="email"
                                        className="block mb-2 text-sm font-small text-gray-600"
                                    >
                                        Email
                                    </label>
                                    <input
                                        ref={emailRef}
                                        required
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        for="password"
                                        className="block mb-2 text-sm font-small text-gray-600"
                                    >
                                        Password
                                    </label>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        required
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="flex justify-end mb-6">
                                    {/* <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck3"
                                            checked
                                        />
                                        <label
                                            className="form-check-label inline-block text-gray-800"
                                            for="exampleCheck2"
                                        >
                                            Remember me
                                        </label>
                                    </div> */}
                                    {/* <a
                                        href="#!"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Forgot password?
                                    </a> */}
                                </div>
                                {/*button css background: rgba(131, 217, 237, 0.3); X:
                                1060px  Y: 271px W: 552px H: 552px  X
                                constraint: Left  Y constraint: Top Fill:
                                Solid  */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="mb-5 w-2/5 px-4 py-2 text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
                                    >
                                        {/* from-btn2 to-btn1 */}
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                src="/image.png"
                                className="w-full object-cover"
                                alt="Phone image"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
