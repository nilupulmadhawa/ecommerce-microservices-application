import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { toast } from "react-toastify";

export default function Users() {
    // const [uOpen, setUOpen] = useState(false);
    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { setNotification, setLoading } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        var act = user.is_active ? "activate" : "deactivate";
        if (!window.confirm(`Are you sure you want to ${act} this user?`)) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            toast.success(`User was successsfully ${act}ed`);
            // setNotification(`User was successsfully  ${act}ed`);
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 className="font-bold text-2xl text-gray-700 px-2">Users</h1>
                <Link
                    className="inline-flex px-3 py-2 font-medium rounded text-white bg-cyan-500 shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
                    to="/users/new"
                >
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )} */}
                    {/* {!loading && ( */}
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link
                                        className="inline-flex items-center px-5 py-2.5 text-xs font-medium rounded text-white bg-amber-500 shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75"
                                        to={"/users/" + u.id}
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    {u.is_active ? (
                                        <button
                                            className="inline-flex items-center px-5 py-2.5 text-xs font-medium rounded text-white bg-green-500 shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                            onClick={(ev) => onDeleteClick(u)}
                                        >
                                            Active
                                        </button>
                                    ) : (
                                        <button
                                            className="inline-flex items-center px-5 py-2.5 text-xs font-medium rounded text-white bg-red-500 shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                            onClick={(ev) => onDeleteClick(u)}
                                        >
                                            Inactive
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* )} */}
                </table>
            </div>
        </div>
    );
}
