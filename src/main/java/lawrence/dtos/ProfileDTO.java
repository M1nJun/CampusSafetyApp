//package lawrence.dtos;
//
//import lawrence.entities.Profile;
//
//public class ProfileDTO {
//    private int profileID;
//    private String userID;
//    private String firstname;
//    private String lastname;
//    private String phone;
//    private String studentID;
//
//    public ProfileDTO() {}
//
//    public ProfileDTO(Profile core) {
//        profileID = core.getProfileID().intValue();
//        userID = core.getUser().getUserID().toString();
//        firstname = core.getFirstname();
//        lastname = core.getLastname();
//        phone = core.getPhone();
//        studentID = core.getStudentID();
//    }
//
//    public int getProfileID() {
//        return profileID;
//    }
//
//    public void setProfileID(int profileID) {
//        this.profileID = profileID;
//    }
//
//    public String getUserID() {
//        return userID;
//    }
//
//    public void setUserID(String userID) {
//        this.userID = userID;
//    }
//
//    public String getLastname() {
//        return lastname;
//    }
//
//    public void setLastname(String lastname) {
//        this.lastname = lastname;
//    }
//
//    public String getFirstname() {
//        return firstname;
//    }
//
//    public void setFirstname(String firstname) {
//        this.firstname = firstname;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getStudentID() {
//        return studentID;
//    }
//
//    public void setStudentID(String studentID) {
//        this.studentID = studentID;
//    }
//}
