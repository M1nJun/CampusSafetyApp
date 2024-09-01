package lawrence.services;

import lawrence.dtos.RequestDTO;
import lawrence.entities.Request;
import lawrence.entities.User;
import lawrence.repositories.RequestRepository;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    public Request findByRequestId(String id){
        Integer intId = Integer.parseInt(id);
        return requestRepository.findById(intId).orElse(null);
    }

    public List<RequestDTO> findCertainStatusRequestsByUser(UUID userId, String status) {
        User user = userRepository.findById(userId).orElse(null);
        List<Request> result = requestRepository.findByRequestStatusAndRequester(status, user);
        List<RequestDTO> requestDTOS = new ArrayList<>();
        for(Request request : result) {
            RequestDTO dto = new RequestDTO(request);
            requestDTOS.add(dto);
        }
        return requestDTOS;
    }

    public List<RequestDTO> findCertainStatusRequestsByOfficer(UUID officerId, String status) {
        User officer = userRepository.findById(officerId).orElse(null);
        List<Request> result = requestRepository.findByRequestStatusAndReceiver(status, officer);
        List<RequestDTO> requestDTOS = new ArrayList<>();
        for(Request request : result) {
            RequestDTO dto = new RequestDTO(request);
            requestDTOS.add(dto);
        }
        return requestDTOS;
    }

    public List<RequestDTO> findCertainStatusesRequestsByOfficer(UUID officerId, List<String> statuses) {
        User officer = userRepository.findById(officerId).orElse(null);
        List<Request> result = requestRepository.findByRequestStatusInAndReceiver(statuses, officer);
        List<RequestDTO> requestDTOS = new ArrayList<>();
        for(Request request : result) {
            RequestDTO dto = new RequestDTO(request);
            requestDTOS.add(dto);
        }
        return requestDTOS;
    }

    // for officers to view all instant requests depending on status
    public List<RequestDTO> getInstantRequests(String status) {
        List<Request> requests = requestRepository.findByReservedAndRequestStatus(false, status);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for drivers to view all instant requests depending on status
    public List<RequestDTO> getInstantRideRequests(String status) {
        List<Request> requests = requestRepository.findByRequestTypeAndReservedAndRequestStatus("ride",false, status);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for officers to view all instant requests that they have personally accepted
    public List<RequestDTO> getInstantRequestsAcceptedByOfficer(UUID officerID) {
        User officer = userRepository.findById(officerID).orElse(null);
        List<Request> requests = requestRepository.findByReservedAndRequestStatusAndReceiver(false,"accepted", officer);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for drivers to view all instant requests that they have personally accepted
    public List<RequestDTO> getInstantRequestsAcceptedByDriver(UUID driverID) {
        User driver = userRepository.findById(driverID).orElse(null);
        List<Request> requests = requestRepository.findByRequestTypeAndReservedAndRequestStatusAndReceiver("ride",false,"accepted", driver);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for officers to view all reserved depending on status
    public List<RequestDTO> getReservedRequests(String status) {
        List<Request> requests = requestRepository.findByReservedAndRequestStatus(true, status);
        List<RequestDTO> result = new ArrayList<>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for drivers to view all reserved ride request depending on status
    public List<RequestDTO> getReservedRideRequests(String status) {
        List<Request> requests = requestRepository.findByRequestTypeAndReservedAndRequestStatus("ride",true, status);
        List<RequestDTO> result = new ArrayList<>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for officers to view all instant requests that they have personally accepted
    public List<RequestDTO> getReservedRequestsAcceptedByOfficer(UUID officerID) {
        User officer = userRepository.findById(officerID).orElse(null);
        List<Request> requests = requestRepository.findByReservedAndRequestStatusAndReceiver(true,"accepted", officer);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    // for drivers to view all instant requests that they have personally accepted
    public List<RequestDTO> getReservedRequestsAcceptedByDriver(UUID driverID) {
        User driver = userRepository.findById(driverID).orElse(null);
        List<Request> requests = requestRepository.findByRequestTypeAndReservedAndRequestStatusAndReceiver("ride", true,"accepted", driver);
        List<RequestDTO> result = new ArrayList<RequestDTO>();
        for (Request r : requests) {
            result.add(new RequestDTO(r));
        }
        return result;
    }

    public String acceptRequest(Integer requestID, UUID receiverID) {
        Optional<Request> maybeRequest = requestRepository.findById(requestID);
        if (!maybeRequest.isPresent()) {
            return "Request not found";
        }
        Request request = maybeRequest.get();

        Optional<User> maybeReceiver = userRepository.findById(receiverID);
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

    public String completeRequest(Integer requestID, UUID receiverID) {
        Optional<Request> maybeRequest = requestRepository.findById(requestID);
        if (!maybeRequest.isPresent()) {
            return "Request not found";
        }
        Request request = maybeRequest.get();

        if (!request.getReceiver().getUserID().equals(receiverID)) {
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

    public String cancelRequest(UUID cancelerID, Integer requestID) {
        Optional<User> maybeCanceler = userRepository.findById(cancelerID);
        if (!maybeCanceler.isPresent()) {
            return "Canceler not found";
        }
        User canceler = maybeCanceler.get();

        Optional<Request> maybeRequest = requestRepository.findById(requestID);
        if (!maybeRequest.isPresent()) {
            return "Request not found";
        }
        Request request = maybeRequest.get();

        String userType = canceler.getUsertype();
        if (userType.equals("Officer") || userType.equals("Driver")) {
            request.setReceiver(canceler);
        }

        request.cancelRequest();
        requestRepository.save(request);

        return "Request successfully canceled";
    }


}
