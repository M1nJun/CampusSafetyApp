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

const ProfileComponent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const edit = () => setIsEdit(true);
  const notEdit = () => setIsEdit(false);
  return (
    <ScrollView>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Email: </Text>
        <TextInput
          placeholder="leemi@lawrence.edu"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Password: </Text>
        <TextInput
          placeholder="********"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>FirstName: </Text>
        <TextInput
          placeholder="Minjun"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>LastName: </Text>
        <TextInput
          placeholder="Lee"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Phone: </Text>
        <TextInput
          placeholder="9206669262"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Student ID: </Text>
        <TextInput
          placeholder="L01210646"
          placeholderTextColor={isEdit ? "black" : "gray"}
          autoCapitalize="none"
          style={{ ...styles.input, flex: 0.7 }}
          editable={isEdit ? true : false}
        ></TextInput>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity
          style={{ ...styles.blueBtn, flex: 0.45, borderRadius: 16 }}
          onPress={isEdit ? notEdit : edit}
        >
          <Text style={styles.blueBtnText}>{isEdit ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileComponent;
