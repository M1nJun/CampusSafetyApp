package lawrence.repositories;

import lawrence.entities.RequestOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestOptionRepository extends JpaRepository<RequestOption, Integer> {
}
