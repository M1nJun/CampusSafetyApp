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
import styles from "../styles";

const TopToggleComponent = ({ isLeft, setIsLeft, leftText, rightText }) => {
  //   const [isRide, setIsRide] = useState(true);
  const left = () => setIsLeft(true);
  const right = () => setIsLeft(false);
  return (
    <View style={{ ...styles.header, marginBottom: 20 }}>
      <TouchableOpacity onPress={left}>
        <Text
          style={{ ...styles.btnText, color: isLeft ? "white" : theme.grey }}
        >
          {leftText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={right}>
        <Text
          style={{ ...styles.btnText, color: !isLeft ? "white" : theme.grey }}
        >
          {rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopToggleComponent;
