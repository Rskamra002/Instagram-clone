import React, { useEffect } from 'react'
import styles from './Profile.module.css'
import { Container, makeStyles, Typography, Button, Divider, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../Redux/UserProfile/action';
import ProfilePosts from './ProfilePosts';


const useStyles = makeStyles((theme) => ({
    main: {
        width: '70vw',
        padding: theme.spacing(3)
    },
    editBtn: {
        height: '10%',
        padding: theme.spacing(0.5, 1),
    },
    divider: {
        margin: theme.spacing(5, 0),
    },
    loader: {
        marginTop: theme.spacing(0.5),
    }
}))


function ProfileDetails() {
    const classes = useStyles();
    const responseArr = useSelector(state => state.profile.data)
    const [data] = responseArr;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserData(1))     // Passing a random ID for now to get the response
    }, [])

    return !data ? < LinearProgress className={classes.loader} /> : (
        <div>
            <Container className={classes.main}>
                <div className={styles.userProfile}>
                    <div>
                        <img src={data.profilePic} alt={`${data.fullName}'s Profile Picture`} />
                    </div>
                    <div>

                        <div>
                            <Typography variant='h5'>{data.userName}</Typography>
                            <Button className={classes.editBtn} variant='outlined'>Edit Profile</Button>
                            <img src="https://i.ibb.co/Bj3GYST/settings.png"></img>
                        </div>

                        <div>
                            <Typography><span style={{ fontWeight: 'bold' }}>1</span> post</Typography>
                            <Typography><span style={{ fontWeight: 'bold' }}>{data.following.length}</span> followers</Typography>
                            <Typography><span style={{ fontWeight: 'bold' }}>{data.followers.length}</span> following</Typography>
                        </div>

                        <div>
                            <Typography>This is the user's Bio</Typography>
                        </div>
                    </div>
                </div>
                <Divider className={classes.divider} />
                <ProfilePosts />
            </Container>
        </div>
    )
}

export default ProfileDetails
