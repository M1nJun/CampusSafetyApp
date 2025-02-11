import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import styles from "../styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import RequestMatchProfileComponent from "./RequestMatchProfileComponent"
import * as TokenService from '../services/tokenService';
import API_BASE_URL from "../config";

const UserRequestViewComponent = () => {
  const route = useRoute();
  const { usertype, requestID } = route.params;

  const navigation = useNavigation();

  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const cancelRequest = async () => {

    if (!cancelReason.trim()) {
      Alert.alert("Error", "Please provide a reason for cancellation.");
      return;
    }
    
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(
        `${API_BASE_URL}/request/cancel?requestID=${requestID}&reason=${cancelReason}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify content type
          },
        }
      );

      if (response.ok) {
        const message = await response.text();
        Alert.alert("Success", message, [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        const errorData = await response.text();
        Alert.alert("Error", `Failed to cancel request: ${errorData}`);
      }
    } catch (error) {
      Alert.alert("Error", `Error cancelling request: ${error.message}`);
    }
  };

  const fetchRequestData = async () => {
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();
      
      const response = await fetch(
        `${API_BASE_URL}/request/${requestID}`,
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

  useEffect(() => {
    fetchRequestData();
  }, []);

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
    <View style={{ backgroundColor: "white", borderRadius: 15, marginBottom: 80 }}>
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
      {requestData.requestStatus === "pending"? null : (
        <RequestMatchProfileComponent 
          usertype={usertype}
          nameToShow={requestData.receiverName}
          profileToShow={usertype === "Student" || usertype === "Faculty" 
            ? requestData.receiver 
            : requestData.requester} 
      />)}
      

      
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
      ): (
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
      )}
      
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
            {new Date(requestData.reservationDue).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </Text>
      </View>): null}
      
      {/* Let's think about if Request made on: is an essential part of a request view!
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
      </View> */}

      
      

      {requestData.requestStatus === "pending" ||
      requestData.requestStatus === "accepted" ? (
        <View
          style={{
            ...styles.widthControll,
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.blueBtn} onPress={async () => {
              try {
                setModalVisible(true);
              } catch (error) {
                Alert.alert("Error", "Failed to cancel the request.");
              }
            }}>
            <Text style={styles.blueBtnText}>Cancel this Request</Text>
          </TouchableOpacity>
        </View>
      ) :  (
      <View style={{paddingLeft:20}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 4,
            }}>Request Status:
        </Text>
        <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginBottom: 18,
            }}
          >
            {requestData.requestStatus}
        </Text>
      </View>)}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cancel Request
            </Text>

            <TextInput
              placeholder="Enter reason for cancellation"
              value={cancelReason}
              onChangeText={(text) => setCancelReason(text)}
              style={{
                height: 100,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: "top",
                marginBottom: 20,
                fontSize: 17,
              }}
              multiline
            />

            {/* Submit and Close Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cancelRequest}
                style={{
                  backgroundColor: "black",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default UserRequestViewComponent;
