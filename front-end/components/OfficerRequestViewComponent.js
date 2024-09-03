import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import RequestMatchProfileComponent from "./RequestMatchProfileComponent"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const OfficerRequestViewComponent = () => {
  const route = useRoute();
  const { token, requestID, usertype } = route.params;

  const navigation = useNavigation();

  const [requestData, setRequestData] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [nameList, setNameList] = useState([]);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  

  const handleDecisionOnRequest = async (decision) => {
    const url = decision === "accept"
      ? `http://localhost:8085/request/${decision}?requestID=${requestID}&receiverName=${receiverName}`
      : `http://localhost:8085/request/${decision}?requestID=${requestID}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        Alert.alert("Success", `Request ${decision} successful.`);
      } else {
        Alert.alert("Error", `Failed to ${decision} request.`);
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred while ${decision} the request.`);
    }
  };

  const fetchNameList = async () => {
    try {
      const response = await fetch("http://localhost:8085/option/officer/driver/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNameList(data); // Set the locations state
      } else {
        Alert.alert("Error", "Failed to fetch names list.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching names list.");
    }
  };

  useEffect(() => {
    console.log(receiverName);
  }, [receiverName]);
  

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8085/request/${requestID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRequestData(data);
          setRequestStatus(data.requestStatus);
        } else {
          Alert.alert("Error", "Fail to fetch the request data.");
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "An error occurred while fetching the request data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
    fetchNameList();
  }, [requestID, token]);



  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!requestData) {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white", borderRadius: 15, paddingBottom:15, marginBottom: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
          }}
        >
          {requestData.requestType === "ride"
            ? "Ride Request"
            : "Safety Request"}
        </Text>
        {requestData.requestType === "ride" ? (
          // <FontAwesome6 name="bus" size={37} color="black" style={{ marginRight: 20 }} />
          <FontAwesome5 name="car" size={37} color="black" style={{ marginRight: 20 }} />
        ) : (
          <MaterialCommunityIcons
            name="shield-check"
            size={37}
            color="black"
            style={{ paddingRight: 20 }}
          />
        )}
      </View>

      <RequestMatchProfileComponent
        token={token}
        usertype={usertype}
        profileToShow={usertype === "Student" || usertype === "Faculty" 
          ? requestData.receiver 
          : requestData.requester} 
      />

      {requestData.requestType === "ride" ? (
        <View style={{paddingLeft:20}}>
          <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Destination:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {requestData.destination}
          </Text>
        </View>
      ): null}

      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Location:
        </Text>
        <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {requestData.location}
        </Text>
      </View>
      
      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>{requestData.requestType === "ride"? "Message to driver" : "Message to officer"}:
        </Text>
        <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {requestData.message}
        </Text>
      </View>

      {requestData.reserved? (
      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Reserved at:
        </Text>
        <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {new Date(requestData.reservationDue).toLocaleString()}
        </Text>
      </View>): null}

      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Request made on:
        </Text>
        <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {new Date(requestData.requestDate).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </Text>
      </View>
      
      {requestStatus === "pending"? (
        <View style={{ ...styles.widthControll, marginTop: 10 }}>
          <TextInput
            placeholder="Officer/Driver Name"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={receiverName}
            onChangeText={(text) => {
              setReceiverName(text)
            }}
            onFocus={() => setShowNameDropdown(true)}
            style={{
              paddingVertical: 11,
              paddingLeft: 15,
              borderRadius: 10,
              fontSize: 17,
              marginLeft: 20,
              flex: 0.65,
              backgroundColor: "#D3D3D3",
              fontWeight: "600",
              color: "black",
            }}
          ></TextInput>
        </View>
      ): null}

      {showNameDropdown && (
        <View style={{...styles.widthControll, justifyContent:"flex-start"}}>
          <View style={{flex:0.9}}>
            <ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
              {nameList.map((nameData) => (
                <TouchableOpacity style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} key={nameData.OfficerDriverOptionID} onPress={() => {
                  setReceiverName(`${nameData.firstname} ${nameData.lastname}`);
                  setShowNameDropdown(false);
                }}>
                  {nameData.type === "Officer" ? (<MaterialIcons name="local-police" size={24} color="black" style={{paddingRight:5}}/>) : (<FontAwesome6 name="bus" size={22} color="black" style={{paddingRight:5}}/>)}
                  <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{`${nameData.firstname} ${nameData.lastname}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}


      
      {/* we don't need the cancel, complete buttons if it is alreayd canceled and completed */}
      {requestStatus === "pending" || requestStatus === "accepted" ? (
        <View
          style={{
            ...styles.widthControll,
            justifyContent: "space-between",
            marginBottom:5
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              try {
                await handleDecisionOnRequest("cancel");
                Alert.alert("Success", "Request successfully canceled.");
                navigation.goBack(); // Navigate back to the previous screen
              } catch (error) {
                Alert.alert("Error", "Failed to cancel the request.");
              }
            }}
            style={{
              ...styles.blueBtn,
              backgroundColor: "black",
              flex: 0.4,
              borderRadius: 17,
              marginLeft: 20,
            }}
          >
            <Text style={{ ...styles.blueBtnText, paddingVertical: 6 }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (requestStatus === "pending") {
                handleDecisionOnRequest("accept");
                setRequestStatus("accepted");
              } else if (requestStatus === "accepted") {
                handleDecisionOnRequest("complete");
                setRequestStatus("completed");
                navigation.goBack();
              }
              // navigation.push("OfficerRequestLock");
            }}
            style={{
              ...styles.blueBtn,
              flex: 0.4,
              borderRadius: 17,
              marginRight: 20,
              opacity: requestStatus === "completed" ? 0.5 : 1, // Deactivate button when completed
            }}
            disabled={requestStatus === "completed"} // Disable button when completed
          >
            <Text style={{ ...styles.blueBtnText, paddingVertical: 6 }}>
            {requestStatus === "pending"
              ? "Accept"
              : requestStatus === "accepted"
              ? "Complete"
              : requestStatus === "completed"
              ? "Completed"
              : "Canceled"
            }
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Request Status:
        </Text>
        <Text
            style={{
              color:requestData.requestStatus === "completed" ? "blue":"red",
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            {requestData.requestStatus}
        </Text>
      </View>)}
      
    </View>
  );
};

export default OfficerRequestViewComponent;
