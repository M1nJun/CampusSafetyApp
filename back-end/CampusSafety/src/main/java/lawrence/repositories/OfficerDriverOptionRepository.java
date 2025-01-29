package lawrence.repositories;

import lawrence.entities.OfficerDriverOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficerDriverOptionRepository extends JpaRepository<OfficerDriverOption, Integer> {

}
