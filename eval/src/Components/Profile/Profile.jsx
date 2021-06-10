import React from "react";
import ProfileDetails from "./UserProfile/ProfileDetails";
import styled from 'styled-components'
const Profile = () => {
  return (
    <Container>
      <ProfileDetails />
    </Container>
  );
}

const Container = styled.div`
  padding-top:50px;
  background:#fafafa;
`;

export default Profile;