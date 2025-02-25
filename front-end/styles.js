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
    paddingVertical: 15,
    borderRadius: 22,
    marginTop: 15,
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
  titleText: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },

  //in UserRequestViewComponent
  infoLabel: {

  },
  infoValue: {

  },
  infoDivider: {
    height: 1,
    backgroundColor: '#A4A4A4',
    marginBottom: 15,
    paddingLeft: -20
  },

  //in MiniProfileComponent
  profileLabel: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 5,
    color: '#A4A4A4',
  },
  profileValue: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  profileDivider: {
    height: 1,
    backgroundColor: '#A4A4A4',
    marginBottom: 15,
  },
  //chatlistscreen
  chatItem: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  //chatscreen
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 22,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  chatHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  chatHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },  
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Blue for sender
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2A2836', // Light gray for receiver
  },
  senderText: {
    color: '#fff', // White text for sender
  },
  receiverText: {
    color: '#fff', // White text for receiver
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // White input background
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default styles;
