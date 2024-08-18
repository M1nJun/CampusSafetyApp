package lawrence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import lawrence.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findByUsername(String username);
}
