import React, { useState, useEffect } from 'react'
import styles from './Profile.module.css'
import { Container, makeStyles, Typography, Divider, LinearProgress } from '@material-ui/core';
import ProfilePosts from './ProfilePosts';
import { posts, igtv, saved, tagged } from './SvgIcons';
import styled from 'styled-components'
import IgTvUploads from './ProfileFeatures/IgTvUploads';
import SavedPosts from './ProfileFeatures/SavedPosts';
import TaggedPosts from './ProfileFeatures/TaggedPosts';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../Redux/UserProfile/action'

// styling material ui elementsS
const useStyles = makeStyles((theme) => ({
    main: {
        width: '70vw',
        padding: theme.spacing(3)
    },
    editBtn: {
        padding: 5,
        height: 28,
    },
    divider: {
        marginTop: theme.spacing(5),
    },
    loader: {
        marginTop: theme.spacing(0.5),
    },
    option: {
        justifyContent: 'center',
        display: 'flex',
        gap: 50,
        margin: theme.spacing(2, 0),
    }
}))


const ProfileDetails = () => {
    const dispatch = useDispatch();
    const user = useParams();
    const [activePage, setActivePage] = useState('posts')
    const classes = useStyles();
    const profileData = useSelector(state => state.profile.data)
    const { username, profile_pic, fullname, followers, following } = profileData;
    useEffect(() => {
        dispatch(getUserData(user))
    }, [dispatch, user])

    console.log('found', profileData)

    return !profileData ? < LinearProgress className={classes.loader} /> : (
        <div>
            <Container className={classes.main}>
                <div className={styles.userProfile}>
                    <div>
                        <img src={profile_pic} alt={`${fullname}'s Profile Pic`} />
                    </div>

                    <div>

                        <div>
                            <Typography variant='h5'>{username}</Typography>
                            <button className={styles.editBtn}>Edit Profile</button>
                            <img src="https://i.ibb.co/Bj3GYST/settings.png" alt=""></img>
                        </div>

                        <div>
                            <Typography><span style={{ fontWeight: 'bold' }}>1</span> post</Typography>
                            <Typography><span style={{ fontWeight: 'bold' }}>{followers.length}</span> followers</Typography>
                            <Typography><span style={{ fontWeight: 'bold' }}>{following.length}</span> following</Typography>
                        </div>

                        <div>
                            <Typography>This is the user's Bio</Typography>
                        </div>

                    </div>
                </div>
                <Divider className={classes.divider} />
                <Container className={classes.option}>

                    <Box>
                        <svg width="12" height="12" viewBox='0 0 48 48'>
                            <path d={posts} />
                        </svg>
                        <button onClick={() => setActivePage('posts')} >POSTS</button>
                    </Box>

                    <Box>
                        <svg width="12" height="12" viewBox='0 0 48 48'>
                            <path d={igtv} />
                        </svg>
                        <button onClick={() => setActivePage('igtv')}>IGTV</button>
                    </Box>

                    <Box>
                        <svg width="12" height="12" viewBox='0 0 48 48'>
                            <path d={saved} />
                        </svg>
                        <button onClick={() => setActivePage('saved')}>SAVED</button>
                    </Box>

                    <Box>
                        <svg width="12" height="12" viewBox='0 0 48 48'>
                            <path d={tagged} />
                        </svg>
                        <button onClick={() => setActivePage('tagged')}>TAGGED</button>
                    </Box>

                </Container>
                {
                    activePage === 'posts' ? <ProfilePosts /> : activePage === 'igtv' ? <IgTvUploads /> :
                        activePage === 'saved' ? <SavedPosts /> : <TaggedPosts />
                }
            </Container>
        </div >
    )
}

// styled components 
const Box = styled.div`
  svg {
    fill: #8e8e8e;
  }

  button {
    border-radius: 3px;
    padding: 0.5rem 0;
    background: transparent;
    margin: 0.5rem 0.4rem;
    font-weight: 400;
    color: #8e8e8e;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
  }

  :active {
    svg {
      fill: black;
    }
    button {
      color: black;
    }
    border-top: 1px solid black;
  }
    margin-top: -17px;
`;


export default ProfileDetails
