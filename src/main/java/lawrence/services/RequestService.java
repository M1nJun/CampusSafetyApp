package lawrence.services;

import lawrence.dtos.RequestDTO;
import lawrence.entities.Request;
import lawrence.entities.User;
import lawrence.repositories.RequestRepository;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    UserRepository userRepository;

    public String save(RequestDTO request) {
        Request newRequest = new Request(request);
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(request.getRequester()));
        if(!maybeUser.isPresent()) {
            return "Bad Id";
        }
        User user = maybeUser.get();
        // Not sure if I'm setting the Requester twice. Room for improvement.
        newRequest.setRequester(user);
        requestRepository.save(newRequest);
        return newRequest.getRequestID().toString();
    }

    public List<RequestDTO> getPendingRequests() {
        List<Request> requests = requestRepository.findByRequestStatus("pending");
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    public List<RequestDTO> getReservedRequests() {
        List<String> statuses = Arrays.asList("pending", "accepted");
        List<Request> requests = requestRepository.findByReservedTrueAndRequestStatusIn(statuses);
        List<RequestDTO> result = new ArrayList<>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    public String acceptRequest(Integer requestId, UUID receiverId) {
        Optional<Request> maybeRequest = requestRepository.findById(requestId);
        if (!maybeRequest.isPresent()) {
            return "Request not found";
        }
        Request request = maybeRequest.get();

        Optional<User> maybeReceiver = userRepository.findById(receiverId);
        if (!maybeReceiver.isPresent()) {
            return "Receiver not found";
        }
        User receiver = maybeReceiver.get();

        request.setReceiver(receiver);
        request.acceptRequest();
        requestRepository.save(request);

        receiver.setBusy(true);
        userRepository.save(receiver);

        return "Request accepted and receiver marked as busy";
    }

    public String completeRequest(Integer requestId, UUID receiverId) {
        Optional<Request> maybeRequest = requestRepository.findById(requestId);
        if (!maybeRequest.isPresent()) {
            return "Request not found";
        }
        Request request = maybeRequest.get();

        if (!request.getReceiver().getUserID().equals(receiverId)) {
            return "Unauthorized action";
        }

        request.completeRequest();
        requestRepository.save(request);

        User receiver = request.getReceiver();
        if (receiver != null) {
            receiver.setBusy(false);
            userRepository.save(receiver);
        }

        return "Request completed and receiver marked as not busy";
    }


}
