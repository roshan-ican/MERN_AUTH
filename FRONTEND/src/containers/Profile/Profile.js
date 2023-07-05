import React, { useEffect, useState } from "react";
// import { userProfile } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { getUser } from '../../services/authServices';
import userAvatar from '../../assets/27 5.png';
import logo from '../../assets/Logo1.svg';

function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);


  const logout = () => {
    // Clear the local storage
    window.localStorage.removeItem('user');
    // Navigate to the login page
    navigate('/login');
  };

  if (!user) {
    return <div>Sorry! there was an error displaying the page</div>
  }

  return (
    <div className="h-screen font-NotoSans flex flex-col items-center">
      <nav className="w-full p-5 h-20 bg-white border-b border-gray-300 flex justify-between items-center">
        <img src={logo} alt="" className="mr-4" />
        <div className="flex items-center">
          <h1 className="font-semibold">{user.fullName}</h1>
          <button className="bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" type="submit" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="flex justify-center gap-10 m-5 w-2/3">
        <div className="border-b bg-[#F7F8FA] w-24 rounded-full h-24 relative">
          <img src={userAvatar} alt="" className="absolute" />
        </div>
        <div className="p-5 bg-white border-b border-gray-300 shadow-md flex flex-col justify-start text-[#7181A1] w-2/3">
          <div>
            <h1 className="text-start font-semibold">PROFILE</h1>
          </div>
          <div className="flex flex-col text-start mt-2">
            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Name:</span>
              </div>
              <div className="w-1/2">
                <span>{user.fullName}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Email:</span>
              </div>
              <div className="w-1/2">
                <span>{user.emailAddress}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Date of Birth:</span>
              </div>
              <div className="w-1/2">
                <span>{user.dateOfBirth}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Phone Number:</span>
              </div>
              <div className="w-1/2">
                <span>+91 {user.phoneNumber}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Address:</span>
              </div>
              <div className="w-1/2">
                <span>{user.address}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">City:</span>
              </div>
              <div className="w-1/2">
                <span>{user.city}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">State:</span>
              </div>
              <div className="w-1/2">
                <span>{user.state}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">ZIP Code:</span>
              </div>
              <div className="w-1/2">
                <span>{user.zipCode}</span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2">
                <span className="font-bold">Country:</span>
              </div>
              <div className="w-1/2">
                <span>{user.country}</span>
              </div>
            </div>

            <div className="flex mb-2">
              <div className="w-1/2">
                <span className="font-bold">Security Question:</span>
              </div>
              <div className="w-1/2">
                <span>{user.securityQuestion}</span>
                <p>{user.securityAnswer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Profile;
