import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RequestMatchProfileComponent = () => {
    return(
      <View style={{marginLeft:20, marginBottom:20}}>
        {/* <Text style={{
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        }}>Officer assigned:
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="user-circle" size={50} color="gray" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Jeff Miller</Text>
            <Text style={{ color: "gray" }}>Profile</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection:"row", marginRight:20, alignItems:"center"}}>
          <TouchableOpacity style={{marginRight:15, backgroundColor:"#e2eafc", borderRadius:20, paddingHorizontal:8, paddingVertical:8}}>
            <MaterialIcons name="message" size={25} color="#00a6fb" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:10, backgroundColor:"#e2eafc", borderRadius:20, paddingHorizontal:8, paddingVertical:8}}>
            <MaterialIcons name="call" size={25} color="#00a6fb" />
          </TouchableOpacity>
        </View>
      </View>
      </View>
      
        

    )
}

export default RequestMatchProfileComponent;