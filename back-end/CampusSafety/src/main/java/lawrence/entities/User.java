package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.UserDTO;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "VARCHAR(45)")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID userID;
    
    private String username;
    private String password;
    private String usertype;
    private String firstname;
    private String lastname;
    private String phone;
    private String studentID;
    private Boolean busy;
    private Boolean verified;
    private String verificationCode;
    private LocalDateTime verificationCodeExpiry;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> sentMessages;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> receivedMessages;

    public User() {}

    public User(UserDTO core) {
        username = core.getUsername();
        usertype = core.getUsertype();
        firstname = core.getFirstname();
        lastname = core.getLastname();
        phone = core.getPhone();
        studentID = core.getStudentID();
        verified = false;
    }

    // Getters and Setters
    public UUID getUserID() { return userID; }
    public void setUserID(UUID userID) { this.userID = userID; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUsertype() { return usertype; }
    public void setUsertype(String usertype) { this.usertype = usertype; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getStudentID() { return studentID; }
    public void setStudentID(String studentID) { this.studentID = studentID; }

    public Boolean getBusy() { return busy; }
    public void setBusy(Boolean busy) { this.busy = busy; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public LocalDateTime getVerificationCodeExpiry() { return verificationCodeExpiry; }
    public void setVerificationCodeExpiry(LocalDateTime verificationCodeExpiry) { this.verificationCodeExpiry = verificationCodeExpiry; }

    public String getVerificationCode() { return verificationCode; }
    public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }

    public List<ChatMessage> getSentMessages() { return sentMessages; }
    public void setSentMessages(List<ChatMessage> sentMessages) { this.sentMessages = sentMessages; }

    public List<ChatMessage> getReceivedMessages() { return receivedMessages; }
    public void setReceivedMessages(List<ChatMessage> receivedMessages) { this.receivedMessages = receivedMessages; }
}
