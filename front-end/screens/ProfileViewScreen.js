import {
    View,
  } from "react-native";
  import React from "react";
  import { useEffect, useState } from "react";
  import styles from "../styles";
  import ProfileComponent from "../components/ProfileComponent";
  import WaitingForOfficerAnimationComponent from "../components/WaitingForOfficerAnimationComponent";
  import { useRoute } from "@react-navigation/native";
  import { useNavigation } from "@react-navigation/native";

  const ProfileViewScreen = () => {
    const route = useRoute();
    const { token, profileToShow, mode } = route.params;

    return(
        <View style={styles.container}>
            <ProfileComponent token={token} profileToShow={profileToShow} mode={mode}/>
        </View>
        
    )
  }

  export default ProfileViewScreen;