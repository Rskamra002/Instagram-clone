import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../Redux/UserProfile/action';
export const ProfileContext = createContext();

function ProfileContextProvider({ children }) {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.profile.data)

    useEffect(() => {
        dispatch(getUserData(1))     // Passing a random ID for now to get the response
    }, [])

    const value = {
        profileData: profileData,
    }
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;
