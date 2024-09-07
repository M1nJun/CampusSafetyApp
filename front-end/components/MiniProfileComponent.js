import React from 'react';
import { View, Text} from 'react-native';
import styles from "../styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MiniProfileComponent = ({ name, phone, email, studentID, type }) => {
  return (
    <View>
        <View style={{alignItems:"center", backgroundColor:"black", borderRadius: 10,  marginBottom: 30, paddingVertical:30}}>
            <FontAwesome name="user-circle" size={100} color="white" />
        </View>
      <Text style={styles.profileLabel}>Full Name</Text>
      <Text style={styles.profileValue}>{name}</Text>
      <View style={styles.profileDivider} />

      <Text style={styles.profileLabel}>Phone</Text>
      <Text style={styles.profileValue}>{phone}</Text>
      <View style={styles.profileDivider} />

      <Text style={styles.profileLabel}>Email</Text>
      {type === "Officer" ? (
        <Text style={styles.profileValue}>security@lawrence.edu</Text>
      ) : (
        <Text style={styles.profileValue}>{email}</Text>
      )}
      <View style={styles.profileDivider} />
        
        {type === "Officer" ? null:(<View>
            <Text style={styles.profileLabel}>Student ID</Text>
            <Text style={styles.profileValue}>{studentID}</Text>
            <View style={styles.profileDivider} />
        </View>)}
        
    </View>
  );
};


export default MiniProfileComponent;