package lawrence.services;

import lawrence.dtos.UserDTO;
import lawrence.entities.User;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    PasswordService passwordService;

    @Autowired
    UserRepository userRepository;

    public String save(UserDTO user) {
        List<User> existing = userRepository.findByUsername(user.getUsername());
       if(!existing.isEmpty()) {
           return "Duplicate";
       }

       User newUser = new User(user);
       String hash = passwordService.hashPassword(user.getPassword());
       newUser.setPassword(hash);
       userRepository.save(newUser);
       return newUser.getUserID().toString();
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
}
