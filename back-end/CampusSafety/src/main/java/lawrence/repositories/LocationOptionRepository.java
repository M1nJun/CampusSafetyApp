package lawrence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import lawrence.entities.LocationOption;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationOptionRepository extends JpaRepository<LocationOption, Integer> {
    List<LocationOption> findByLocationNameContainingIgnoreCase(String keyword);
}