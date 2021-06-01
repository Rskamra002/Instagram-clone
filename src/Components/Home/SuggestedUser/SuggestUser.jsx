import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { loadData } from '../../../Utils/localStorage'
import { Details } from './Details'
import { IndividualUserSuggestion } from './IndividualUserSuggestion'

const SuggestUser = () => {
    const [profile, setProfile] = useState({})
    const [newPerson, setNewPerson] = useState([])
    const following = profile?.following
    const suggestions = useSelector(state => state.user.user)
    useEffect(() => {
        let b = loadData("users")
        setProfile(b)
        let updated = suggestions?.filter((item) => !following?.includes(item.id) && item.id !== profile?.id)
        setNewPerson(updated)
    },[])
    return (
        <SuggestionsWrapper>
            <UserProfile>
                <img src={profile.profile_pic} alt="profile"/>
                <div>
                    <h4>{profile.username}</h4>
                    <p>{profile.fullname}</p>
                </div>
            </UserProfile>
            <br/>
            <SuggestionHead>
                <h4>Suggestions For You</h4>
                <p>See All</p>
            </SuggestionHead>
            { newPerson && 
                <>
                <IndividualUserSuggestion profile_pic={newPerson[0]?.profile_pic} username={newPerson[0]?.username}/>
                <IndividualUserSuggestion profile_pic={newPerson[1]?.profile_pic} username={newPerson[1]?.username}/>
                <IndividualUserSuggestion profile_pic={newPerson[2]?.profile_pic} username={newPerson[2]?.username}/>
                <IndividualUserSuggestion profile_pic={newPerson[3]?.profile_pic} username={newPerson[3]?.username}/>
                <IndividualUserSuggestion profile_pic={newPerson[4]?.profile_pic} username={newPerson[4]?.username}/>
                </>
            }
            <Details/>
        </SuggestionsWrapper>
        
    )
}

export {SuggestUser}

const SuggestionsWrapper = styled.div`
    width:24%;
    right:15%;
    position: fixed;
    height:480px;
    margin-top: 30px;
    padding: 30px 10px 10px 20px;
`
const UserProfile = styled.div`
    height: 60px;
    display: flex;
    gap:15px;
    img {
        background: white;
        border-radius: 50%;
    }
    div {
        padding-top: 12px;
        font-size: 13px;
    }
    p{
        color: #9C9C9C;
    }
    h4{
        font-weight: 600;
    }
`
const SuggestionHead = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 14px;
    h4{
        color: #9C9C9C;
        font-weight: 500;
    }
    p{
        cursor: pointer;
        font-weight: 400
    }
`




