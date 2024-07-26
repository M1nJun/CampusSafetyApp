package lawrence.repositories;

import lawrence.entities.Profile;
import lawrence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

    Profile findByUser(User user);
}
