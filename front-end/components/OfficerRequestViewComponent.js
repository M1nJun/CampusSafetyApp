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

const OfficerRequestViewComponent = () => {
  const route = useRoute();
  const { token, requestID } = route.params;

  const navigation = useNavigation();

  const [requestData, setRequestData] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const handleDecisionOnRequest = async (decision) => {
    try {
      const response = await fetch(
        `http://localhost:8085/request/${decision}?requestID=${requestID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        Alert.alert("Success", `Request ${decision} successful.`);
        
      } else {
        Alert.alert("Error", `Failed to request ${decision}.`);
      }
    } catch (error) {
      Alert.alert("Error", `An error occured while request ${decision}.`);
    }
  };

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
    <View style={{ backgroundColor: "white", borderRadius: 15, marginBottom: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 20,
          paddingBottom: 40,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="user-circle" size={50} color="gray" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Minjun Lee</Text>
            <Text style={{ color: "gray" }}>Profile</Text>
          </View>
        </TouchableOpacity>
        {requestData.requestType === "ride" ? (
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

      <Text
        style={{
          fontSize: 25,
          fontWeight: "700",
          marginLeft: 20,
          marginBottom:10
        }}
      >
        {requestData.requestType === "ride"
          ? "Ride Request"
          : "Safety Request"}
      </Text>

      <View style={{paddingLeft:20}}>
        <Text style={{
          fontSize: 18,
          fontWeight: "600",
          marginVertical: 4,
          }}>Subject:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginBottom: 13,
          }}
        >
          {requestData.requestSubject}
        </Text>
      </View>

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
              marginBottom: 13,
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
              marginBottom: 13,
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
              marginBottom: 13,
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
              marginBottom: 13,
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
              marginBottom: 13,
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

      <View style={{ ...styles.widthControll, marginTop: 40 }}>
        <TextInput
          placeholder="Officer Name"
          placeholderTextColor="white"
          autoCapitalize="none"
          style={{
            paddingVertical: 11,
            paddingLeft: 15,
            borderRadius: 10,
            marginVertical: 10,
            fontSize: 17,
            marginLeft: 20,
            flex: 0.65,
            backgroundColor: "#D3D3D3",
            fontWeight: "600",
            color: "white",
          }}
        ></TextInput>
      </View>
      <View
        style={{
          ...styles.widthControll,
          justifyContent: "space-between",
          paddingBottom: 25,
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
            : "Completed"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfficerRequestViewComponent;
