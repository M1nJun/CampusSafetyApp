package lawrence.dtos;

public class LoginResponseDTO {
    private String token;
    private Boolean verified;
    private String usertype;

    // Constructor
    public LoginResponseDTO(String token, String usertype, Boolean verified) {
        this.token = token;
        this.usertype = usertype;
        this.verified = verified;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }
}