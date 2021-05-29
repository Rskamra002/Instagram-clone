import React from "react";
import ProfileContextProvider from "../../Context/ProfileContextProvider";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  return (
    <>
      <ProfileContextProvider>
        <ProfileDetails />
      </ProfileContextProvider>
    </>
  );
}

export default Profile;