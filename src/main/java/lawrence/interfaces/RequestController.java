package lawrence.interfaces;

import lawrence.dtos.RequestDTO;
import lawrence.securities.CampusSafetyUserDetails;
import lawrence.services.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot generate key");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(key);
    }
}
