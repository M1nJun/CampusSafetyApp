package lawrence.services;

import lawrence.dtos.UserDTO;
import lawrence.entities.User;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    PasswordService passwordService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    public String save(UserDTO user) {
        List<User> existing = userRepository.findByUsername(user.getUsername());
       if(!existing.isEmpty()) {
           return "Duplicate";
       }
       User newUser = new User(user);
       String hash = passwordService.hashPassword(user.getPassword());
       newUser.setPassword(hash);
       String verificationCode = String.format("%06d", new Random().nextInt(999999));
       newUser.setVerificationCode(verificationCode);
       newUser.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(15));
       userRepository.save(newUser);

        // Send verification email
        emailService.sendVerificationEmail(user.getUsername(), "Email Verification",
                "Your verification code is: " + verificationCode);

       return newUser.getUserID().toString();
    }

    public String newCode(User user) {
        String verificationCode = String.format("%06d", new Random().nextInt(999999));
        user.setVerificationCode(verificationCode);
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(user.getUsername(), "Email Verification",
                "Your verification code is: " + verificationCode);

        return "New Verification Code Generated";
    }


    public User findByNameAndPassword(String username, String password) {
        List<User> existing = userRepository.findByUsername(username);
        if(existing.size() != 1)
            return null;
        User u = existing.get(0);
        if(passwordService.verifyHash(password, u.getPassword())) {
            u.setPassword("Undisclosed");
        } else{
            u = null;
        }
        return u;
    }

    public User findByUser(String id){
        Optional<User> u = userRepository.findById(UUID.fromString(id));
        if(u.isPresent())
            return u.get();
        return new User();
    }

    public String onSuccessfulVerification(User user){
        user.setVerified(true);
        user.setVerificationCode(null);
        user.setVerificationCodeExpiry(null);
        userRepository.save(user);
        return "Successfully Verified";
    }

    public String updateProfile(User user, UserDTO newProfile){
        user.setFirstname(newProfile.getFirstname());
        user.setLastname(newProfile.getLastname());
        user.setPhone(newProfile.getPhone());
        user.setStudentID(newProfile.getStudentID());
        userRepository.save(user);
        return "Successfully Updated";
    }
}
