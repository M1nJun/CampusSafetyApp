package lawrence.interfaces;

import lawrence.dtos.RequestDTO;
import lawrence.entities.Request;
import lawrence.securities.CampusSafetyUserDetails;
import lawrence.services.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/request")
@CrossOrigin(origins = "*")
public class RequestController  {

    private RequestService rs;

    public RequestController(RequestService rs) {
        this.rs = rs;
    }

    @PostMapping
    public ResponseEntity<String> save(Authentication authentication, @RequestBody RequestDTO request) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        request.setRequester(id.toString());
        String key = rs.save(request);
        if (key.equals("Bad Id")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot generate key");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(key);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestDTO>findByRequestId(Authentication authentication, @PathVariable String id) {
        Request request = rs.findByRequestId(id);
        RequestDTO result = new RequestDTO(request);
        return ResponseEntity.ok().body(result);
    }

    // should update this so that it only returns the list of ids.
    // need to make a method that searches all the request made by the user that is reserved and in pending status.
    @GetMapping("/self/pending/all")
    public ResponseEntity<List<RequestDTO>> findPendingRequestsByUser(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        List<RequestDTO> requests = rs.findCertainStatusRequestsByUser(id, "pending");

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/self/accepted/all")
    public ResponseEntity<List<RequestDTO>> findAcceptedRequestsByUser(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        List<RequestDTO> requests = rs.findCertainStatusRequestsByUser(id, "accepted");

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/self/completed/all")
    public ResponseEntity<List<RequestDTO>> findCompletedRequestsByUser(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        List<RequestDTO> requests = rs.findCertainStatusRequestsByUser(id, "completed");

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/officer/self/completed/all")
    public ResponseEntity<List<RequestDTO>> findCompletedRequestsByOfficer(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());
        // also driver.
        List<RequestDTO> requests = rs.findCertainStatusRequestsByOfficer(id, "completed");

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/officer/self/completed/canceled/all")
    public ResponseEntity<List<RequestDTO>> findCompletedAndCanceledRequestsByOfficer(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID id = UUID.fromString(details.getUsername());

        List<String> statuses = Arrays.asList("completed", "canceled");
        // also driver.
        List<RequestDTO> requests = rs.findCertainStatusesRequestsByOfficer(id, statuses);

        return ResponseEntity.ok(requests);
    }


    @GetMapping("/{id}/status")
    public ResponseEntity<String>findStatusByRequestId(Authentication authentication, @PathVariable String id) {
        Request request = rs.findByRequestId(id);
        String status = request.getRequestStatus();

        return ResponseEntity.ok(status);
    }

    // all user's instant request
    @GetMapping("/instant/pending/all")
    public ResponseEntity<List<RequestDTO>> findAllInstantPendingRequest() {
        List<RequestDTO> result = rs.getInstantRequests("pending");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/instant/pending/ride")
    public ResponseEntity<List<RequestDTO>> findRideInstantPendingRequest() {
        List<RequestDTO> result = rs.getInstantRideRequests("pending");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // instant requests that have been accepted by a particular officer
    @GetMapping("/instant/accepted/all")
    public ResponseEntity<List<RequestDTO>> getInstantRequestsAcceptedByOfficer(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID officerID = UUID.fromString(details.getUsername());
        List<RequestDTO> result = rs.getInstantRequestsAcceptedByOfficer(officerID);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // instant requests that have been accepted by a particular driver
    @GetMapping("/instant/accepted/ride")
    public ResponseEntity<List<RequestDTO>> getInstantRequestsAcceptedByDriver(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID driverID = UUID.fromString(details.getUsername());
        List<RequestDTO> result = rs.getInstantRequestsAcceptedByDriver(driverID);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/reserved/pending/all")
    public ResponseEntity<List<RequestDTO>> findAllReservedPendingRequests() {
        List<RequestDTO> result = rs.getReservedRequests("pending");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/reserved/pending/ride")
    public ResponseEntity<List<RequestDTO>> findRideReservedPendingRequests() {
        List<RequestDTO> result = rs.getReservedRideRequests("pending");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // reserved requests that have been accepted by "me"
    @GetMapping("/reserved/accepted/all")
    public ResponseEntity<List<RequestDTO>> getReservedRequestsAcceptedByOfficer(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID officerID = UUID.fromString(details.getUsername());
        List<RequestDTO> result = rs.getReservedRequestsAcceptedByOfficer(officerID);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // reserved requests that have been accepted by "me"
    @GetMapping("/reserved/accepted/ride")
    public ResponseEntity<List<RequestDTO>> getReservedRequestsAcceptedByDriver(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID driverID = UUID.fromString(details.getUsername());
        List<RequestDTO> result = rs.getReservedRequestsAcceptedByDriver(driverID);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptRequest(Authentication authentication, @RequestParam Integer requestID, @RequestParam String receiverName) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        System.out.println(receiverName);
        UUID receiverID = UUID.fromString(details.getUsername());
        String response = rs.acceptRequest(requestID, receiverID, receiverName);
        if (response.equals("Request accepted and receiver marked as busy")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completeRequest(Authentication authentication, @RequestParam Integer requestID) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID receiverID = UUID.fromString(details.getUsername());
        String response = rs.completeRequest(requestID, receiverID);
        if (response.equals("Request completed and receiver marked as not busy")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelRequest(Authentication authentication, @RequestParam Integer requestID, @RequestParam String reason) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID cancelerID = UUID.fromString(details.getUsername());
        // as of right now, I just set it up so that the person who canceled it is not important
        // working on the student cancellation tho.
        String response = rs.cancelRequest(cancelerID, requestID, reason);
        if (response.equals("Request successfully canceled")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }



}
