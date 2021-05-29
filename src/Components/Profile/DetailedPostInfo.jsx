import React, { useContext } from "react";
import {
    Container,
    makeStyles,
    Typography,
    Divider,
    Box,
    Paper,
    Modal,
    Grid,
    Avatar
} from "@material-ui/core";
import styles from './Profile.module.css'
import CloseIcon from '@material-ui/icons/Close';
import { ProfileContext } from "../../Context/ProfileContextProvider";

// styling material ui elements

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "70%",
        margin: "auto",
        height: "600px",
        marginTop: theme.spacing(5),
        outline: 'none'
    },

    close: {
        right: 20,
        top: 20,
        color: 'white',
        padding: 20,
        position: 'absolute',
        width: 50,
        "& :hover": {
            cursor: 'pointer',
        }
    },

    info: {
        "& h6": {
            marginLeft: 15,
            marginTop: 5,
        },
    }
}));

const DetailedPostInfo = (data) => {

    const { profileData } = useContext(ProfileContext)
    const { username, profile_pic, fullname } = profileData;

    const { imgSrc, handlePostDisplay } = data;
    const classes = useStyles();

    return (
        <Container>
            <Modal open={true} className={classes.container}>
                <Paper className={classes.paper}>
                    <CloseIcon fontSize="large" className={classes.close} onClick={handlePostDisplay} />

                    <Grid container className={styles.postInfo}>

                        <Grid item xs={7} s={7} md={7} lg={7} xl={7} >
                            <img src={imgSrc} alt={`${fullname}'s Post`} />
                        </Grid>

                        <Grid item xs={5} s={5} md={5} lg={5} xl={5} className={classes.info}>
                            <Box>
                                <Avatar alt={`${fullname}'s Profile Picture`} src={profile_pic}></Avatar>
                                <Typography variant='h6'>{username}</Typography>
                            </Box>
                            <Divider />
                        </Grid>

                    </Grid>
                </Paper>
            </Modal>
        </Container>
    );
}

export default DetailedPostInfo;
