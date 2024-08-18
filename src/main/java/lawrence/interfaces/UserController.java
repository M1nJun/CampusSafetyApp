package lawrence.interfaces;

import lawrence.dtos.LoginResponseDTO;
import lawrence.entities.User;
import lawrence.securities.CampusSafetyUserDetails;
import lawrence.services.EmailService;
import lawrence.services.UserService;
import lawrence.dtos.UserDTO;
import lawrence.securities.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    private UserService us;
    private JwtService jwtService;
    private EmailService emailService;

    public UserController(UserService us, JwtService jwtService) {
        this.us = us;
        this.jwtService = jwtService;
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody UserDTO user) {
        if (user.getUsername().isBlank() || user.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empty user name or password");
        }

        String key = us.save(user);
        if (key.equals("Duplicate")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this name already exists");
        } else if (key.equals("Error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not generate key");
        }
        String token = jwtService.makeJwt(key);

        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    @PostMapping("/newcode")
    public ResponseEntity<String> newCode(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        User user = us.findByUser(id.toString());

        String result = us.newCode(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody String verificationCode, Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        User user = us.findByUser(id.toString());


        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        if (user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verification code expired");
        }

        if (!user.getVerificationCode().trim().equals(verificationCode.trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code");
        }

        // Verification successful, remove the verification code and expiry time
        String result = us.onSuccessfulVerification(user);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody UserDTO user) {
        User result = us.findByNameAndPassword(user.getUsername(), user.getPassword());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String token = jwtService.makeJwt(result.getUserID().toString());
        String usertype = result.getUsertype();
        Boolean verified = result.getVerified();

        LoginResponseDTO responseDTO = new LoginResponseDTO(token, usertype, verified);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }



    @GetMapping("/profile/self")
    public ResponseEntity<UserDTO> findByUserSelf(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        User user = us.findByUser(id.toString());
        UserDTO result = new UserDTO(user);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<UserDTO> findByUser(Authentication authentication, @PathVariable String id) {
        User user = us.findByUser(id);
        UserDTO result = new UserDTO(user);
        return ResponseEntity.ok().body(result);
    }




}
