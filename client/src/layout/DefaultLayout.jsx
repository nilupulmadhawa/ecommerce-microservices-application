import { Link, Navigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// import { useAuthContext } from "../context/AuthContext";


export default function DefaultLayout() {
    // const { user, token, setUser, setToken } = useAuthContext();
    // if (!token) {
    //     return <Navigate to="/login" />
    // }

    const onLogout = e => {
        e.preventDefault()
        // setUser(null)
        // setToken(null)
        window.location.reload();
    }

    return (
        <>
            <nav className="border-b py-3 sticky top-0 bg-white z-50">
                <div className="container mx-auto flex justify-between">
                    <h1 className="w-32">
                        <Link to="/" className=" ">
                            <img src="../assets/logo.png" alt="logo" className="w-32" />
                        </Link>
                    </h1>
                    <div className="flex  items-center">
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={regular('compass')} className="h-7 w-7 mx-5 flex text-center" />
                        </Link>
                        <Link to={'profile'}>
                            <FontAwesomeIcon icon={regular('user')} className="h-7 w-7 mx-5 flex text-center" />
                        </Link>
                        <Link to={'profileedit'}>
                            <FontAwesomeIcon icon={solid('gear')} className="h-7 w-7 mx-5 flex text-center" />
                        </Link>
                        {/* <button
                            className="flex rounded-full"
                            id="user-menu"
                            aria-label="User menu"
                            aria-haspopup="true"
                        >
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                                alt
                            />
                        </button> */}
                    </div>
                    <Link className="flex felx-row pt-2" onClick={onLogout}>
                        <span className="text-xl font-semibold text-gray-700 mr-3">Logout</span>
                        <FontAwesomeIcon icon={solid('right-from-bracket')} className="h-7 w-7 mr-5 flex text-center" />
                    </Link>
                </div>
            </nav>

            <Outlet />

        </>
    )
}
