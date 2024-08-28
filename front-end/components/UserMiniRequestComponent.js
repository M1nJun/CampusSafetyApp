import React from "react";
import { theme } from "../colors";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import styles from "../styles";
import Ionicons from '@expo/vector-icons/Ionicons';

const UserMiniRequestComponent = ({
  navigation,
  requestID,
  requestType,
  date,
  reserved,
  token,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.miniRequest, marginBottom: 10}}
      onPress={() =>
        navigation.navigate("RequestView", {
          token,
          requestID,
          userType: "student",
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 18,
          alignItems: "center",
        }}
      >
        {requestType === "ride" ? (
          <FontAwesome5 name="car" size={22} color="black" style={{marginRight:8}} />
        
      ) : (
        <MaterialCommunityIcons
          name="shield-check"
          size={22}
          color="black"
          style={{marginRight:8}}
        />
      )}
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {requestType === "ride" ? "Ride" : "Safety"} Request
        </Text>
        <Text style={{ fontSize: 15, marginLeft:13, color:theme.grey }}>{new Date(date).toDateString()}</Text>
      </View>
      {reserved? (<View style={{width:"30%", flexDirection:"row", alignItems:"center", justifyContent:"center", backgroundColor: "lightgray", borderRadius: 15, alignSelf:"flex-end", marginRight:10, marginTop: 3}}>
        <Text style={{fontWeight: "500", paddingLeft: 4}}>Reserved</Text>
        <Ionicons name="timer" size={18} color="black" style={{marginLeft:2}}/>
      </View>) : null}
    </TouchableOpacity>
  );
};

export default UserMiniRequestComponent;
