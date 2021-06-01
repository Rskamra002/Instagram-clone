import React from "react";
import ProfileDetails from "./ProfileDetails";
import styled from 'styled-components'
const Profile = () => {
  return (
    <Container>
      <ProfileDetails />
    </Container>
  );
}

const Container = styled.div`
  margin-top:50px;
`;

export default Profile;