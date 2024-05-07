import React from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
    const userData = useSelector((state) => state.user.loggedInUser);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4">User Profile</h1>
                            {userData && (
                                <div>
                                    <p><strong>Username:</strong> {userData.username}</p>
                                    <p><strong>First Name:</strong> {userData.firstName}</p>
                                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                                    <p><strong>Phone:</strong> {userData.phone}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    {userData.avatar && <img className="img-fluid" src={userData.avatar} alt="Avatar" />}
                                </div>
                            )}
                            <UpdateProfile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
