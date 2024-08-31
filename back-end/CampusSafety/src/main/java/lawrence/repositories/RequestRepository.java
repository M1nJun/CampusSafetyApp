package lawrence.repositories;

import lawrence.entities.Request;
import lawrence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByReservedAndRequestStatus(Boolean reserved, String requestStatus);
    List<Request> findByRequestTypeAndReservedAndRequestStatus(String requestType, Boolean reserved, String requestStatus);
    List<Request> findByRequestStatusAndRequester(String requestStatus, User requester);
    List<Request> findByRequestStatusAndReceiver(String requestStatus, User receiver);
    List<Request> findByReservedAndRequestStatusAndReceiver(Boolean reserved, String requestStatus, User receiver);
    List<Request> findByRequestTypeAndReservedAndRequestStatusAndReceiver(String requestType, Boolean reserved, String requestStatus, User receiver);

}
