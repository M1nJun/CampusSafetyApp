package lawrence.interfaces;

import lawrence.entities.User;
import lawrence.securities.CampusSafetyUserDetails;
import lawrence.services.UserService;
import lawrence.dtos.UserDTO;
import lawrence.securities.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    private UserService us;
    private JwtService jwtService;

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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO user) {
        User result = us.findByNameAndPassword(user.getUsername(), user.getPassword());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        String token = jwtService.makeJwt(result.getUserID().toString());
        return ResponseEntity.status(HttpStatus.OK).body(token);
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
