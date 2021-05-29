import React, { useContext } from 'react'
import styles from './Profile.module.css'
import { Container, makeStyles, Typography, Divider, LinearProgress } from '@material-ui/core';
import ProfilePosts from './ProfilePosts';
import { ProfileContext } from '../../Context/ProfileContextProvider';

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
        margin: theme.spacing(5, 0),
    },
    loader: {
        marginTop: theme.spacing(0.5),
    }
}))


const ProfileDetails = () => {
    const { profileData } = useContext(ProfileContext);

    const classes = useStyles();
    const { fullname, username, followers, following, profile_pic } = profileData

    return !profileData ? < LinearProgress className={classes.loader} /> : (
        <div>
            <Container className={classes.main}>
                <div className={styles.userProfile}>
                    <div>
                        <img src={profile_pic} alt={`${fullname}'s Profile Picture`} />
                    </div>

                    <div>

                        <div>
                            <Typography variant='h5'>{username}</Typography>
                            <button className={styles.editBtn}>Edit Profile</button>
                            <img src="https://i.ibb.co/Bj3GYST/settings.png"></img>
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

                <ProfilePosts />
            </Container>
        </div>
    )
}

export default ProfileDetails
