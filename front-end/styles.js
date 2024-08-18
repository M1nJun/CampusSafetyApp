import { StyleSheet } from "react-native";
import { theme } from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  widthControll: {
    flexDirection: "row",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "600",
  },
  blueBtn: {
    backgroundColor: theme.lightBlue,
    marginTop: 25,
    flex: 0.9,
    borderRadius: 11,
  },
  blueBtnText: {
    textAlign: "center",
    // paddingHorizontal: 80,
    paddingVertical: 8,
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    flex: 0.9,
    paddingVertical: 13,
    paddingLeft: 15,
    borderRadius: 20,
    marginVertical: 10,
    fontSize: 17,
  },
  signUp: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  question: {
    fontSize: 17,
    color: "white",
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    justifyContent: "center",
  },
  reserveBtn: {
    borderRadius: 12,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  reserveBtnText: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    fontWeight: "600",
  },
  questionContainer: {
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    marginRight: 20,
    fontWeight: "600",
    fontSize: 18,
    flex: 0.3,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    // paddingHorizontal: 16,
  },
  miniRequest: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 22,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verificationInput: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    width: 45,
    height: 55,
    backgroundColor: "white",
    borderRadius: 11,
    marginHorizontal: 6,
  },
});

export default styles;
