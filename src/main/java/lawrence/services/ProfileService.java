package lawrence.services;

import lawrence.dtos.ProfileDTO;
import lawrence.entities.Profile;
import lawrence.entities.User;
import lawrence.repositories.ProfileRepository;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {
    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    UserRepository userRepository;

    public String save(ProfileDTO profile) {
        // Find existing profiles with the same userID
        Optional<User> u = userRepository.findById(UUID.fromString(profile.getUserID()));
        Profile existingProfile = profileRepository.findByUser(u.get());

        if (existingProfile != null) {
            profileRepository.delete(existingProfile);
        }

        Profile newProfile = new Profile();
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(profile.getUserID()));
        if(!maybeUser.isPresent())
            return "Bad Id";
        User user = maybeUser.get();
        newProfile.setUser(user);

        newProfile.setFirstname(profile.getFirstname());
        newProfile.setLastname(profile.getLastname());
        newProfile.setPhone(profile.getPhone());
        newProfile.setStudentID(profile.getStudentID());
        profileRepository.save(newProfile);
        return newProfile.getProfileID().toString();
    }
}
