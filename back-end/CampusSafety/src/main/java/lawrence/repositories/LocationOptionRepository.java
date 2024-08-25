package lawrence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import lawrence.entities.LocationOption;

import java.util.List;

public interface LocationOptionRepository extends JpaRepository<LocationOption, Integer> {
    List<LocationOption> findByLocationNameContainingIgnoreCase(String keyword);
}
