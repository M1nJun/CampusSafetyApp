package lawrence.repositories;

import lawrence.entities.Request;
import lawrence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByRequestStatus(String requestStatus);
    List<Request> findByReservedTrueAndRequestStatusIn(List<String> statuses);
    List<Request> findByRequestStatusAndRequester(String requestStatus, User requester);
}
