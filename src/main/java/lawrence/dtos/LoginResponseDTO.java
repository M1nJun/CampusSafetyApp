package lawrence.dtos;

public class LoginResponseDTO {
    private String token;
    private String usertype;

    // Constructor
    public LoginResponseDTO(String token, String usertype) {
        this.token = token;
        this.usertype = usertype;
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
}