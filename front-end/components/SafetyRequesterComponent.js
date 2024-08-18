//rnf
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
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import styles from "../styles";

const SafetyRequesterComponent = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const [isReserve, setIsReserve] = useState(false);
  const reserve = () => setIsReserve(true);
  const instant = () => setIsReserve(false);

  return (
    <ScrollView>
      <View
        style={{
          ...styles.widthControll,
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="What do you need help with?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
        ></TextInput>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TextInput
          placeholder="Where are you?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
        ></TextInput>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          When do you want this ride to happen?
        </Text>
      </View>
      <View
        style={{
          ...styles.widthControll,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.reserveBtn,
            backgroundColor: !isReserve ? "white" : theme.lightGrey,
          }}
          onPress={() => {
            instant();
            setShow(false);
          }}
        >
          {!isReserve && (
            <FontAwesome6
              name="check-circle"
              size={24}
              color="black"
              style={{ paddingLeft: 7, paddingTop: 6 }}
            />
          )}
          <Text
            style={{
              ...styles.reserveBtnText,
              color: !isReserve ? "black" : theme.grey,
            }}
          >
            Right now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reserveBtn,
            backgroundColor: isReserve ? "white" : theme.lightGrey,
          }}
          onPress={() => {
            reserve();
            showDatepicker();
          }}
        >
          {isReserve && (
            <FontAwesome6
              name="check-circle"
              size={24}
              color="black"
              style={{ paddingLeft: 7, paddingTop: 6 }}
            />
          )}
          <Text
            style={{
              ...styles.reserveBtnText,
              color: isReserve ? "black" : theme.grey,
            }}
          >
            By this date
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.widthControll,
          marginVertical: 20,
          justifyContent: "flex-end",
        }}
      >
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            themeVariant="dark"
          />
        )}
        {show && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            onChange={onChange}
            themeVariant="dark"
            style={{ marginLeft: 0 }}
          />
        )}
      </View>
      <Text style={{ color: "white" }}>selected: {date.toLocaleString()}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Do you have any message for the officer?
        </Text>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TextInput
          placeholder="Write here..."
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{
            ...styles.input,
            paddingBottom: 60,
          }}
        ></TextInput>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity style={styles.blueBtn}>
          <Text style={styles.blueBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SafetyRequesterComponent;
