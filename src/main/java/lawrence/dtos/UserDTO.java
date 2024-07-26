package lawrence.dtos;

import lawrence.entities.User;

public class UserDTO {
    private String username;
    private String password;
    private String usertype;
    private String firstname;
    private String lastname;
    private String phone;
    private String studentID;

    public UserDTO() {}

    public UserDTO(User core) {
        username = core.getUsername();
        password = core.getPassword();
        usertype = core.getUsertype();
        firstname = core.getFirstname();
        lastname = core.getLastname();
        phone = core.getPhone();
        studentID = core.getStudentID();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }
}
