//package lawrence.entities;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lawrence.dtos.ProfileDTO;
//
//@Entity
//@Table(name="profiles")
//public class Profile {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer profileID;
//    @OneToOne
//    @JoinColumn(name = "userID")
//    private User user;
//    private String firstname;
//    private String lastname;
//    private String phone;
//    private String studentID;
//
//    public Profile() {}
//
//    public Profile(ProfileDTO core) {
//        firstname = core.getFirstname();
//        lastname = core.getLastname();
//        phone = core.getPhone();
//        studentID = core.getStudentID();
//    }
//
//    public Integer getProfileID() {
//        return profileID;
//    }
//
//    public void setProfileID(Integer profileID) {
//        this.profileID = profileID;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
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
//    public String getLastname() {
//        return lastname;
//    }
//
//    public void setLastname(String lastname) {
//        this.lastname = lastname;
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
