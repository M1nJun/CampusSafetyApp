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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Cannot generate key\"}");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("{\"key\":\"" + key + "\"}");
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
        List<RequestDTO> requests = rs.findPendingRequestsByUser(id);

        return ResponseEntity.ok(requests);
    }

    // need to make a method that searches all the request that are in completed status.

    // need to make a method that searches for reserved requests that are 30 minutes away from the reservation time.

    // need to make a method that searches for instant requests in time order

    // need to make a method that searches for reserved requests that are more than 30 minutes away from the reservation time.

    // need to make a method that cancels the request



    @GetMapping("pending/all")
    public ResponseEntity<List<RequestDTO>> findAllRequest(Authentication authentication) {
        List<RequestDTO> result = rs.getPendingRequests();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/reserved/pending-or-accepted/all")
    public ResponseEntity<List<RequestDTO>> findAllReservedRequests() {
        List<RequestDTO> result = rs.getReservedRequests();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptRequest(Authentication authentication, @RequestParam Integer requestId) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID receiverId = UUID.fromString(details.getUsername());
        String response = rs.acceptRequest(requestId, receiverId);
        if (response.equals("Request accepted and receiver marked as busy")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completeRequest(Authentication authentication, @RequestParam Integer requestId) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID receiverId = UUID.fromString(details.getUsername());
        String response = rs.completeRequest(requestId, receiverId);
        if (response.equals("Request completed and receiver marked as not busy")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelRequest(Authentication authentication, @RequestParam Integer requestId) {
//        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
//        UUID receiverId = UUID.fromString(details.getUsername());
        // as of right now, I just set it up so that the person who cancelled it is not important
        // working on the student cancellation tho.
        String response = rs.cancelRequest(requestId);
        if (response.equals("Request accepted and receiver marked as busy")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    // at some point we'll need a method that queries for just the ride requests for the driver app.
}
