package lawrence.interfaces;


import lawrence.dtos.LocationOptionDTO;
import lawrence.dtos.RequestOptionDTO;
import lawrence.services.OptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/option")
@CrossOrigin(origins = "*")
public class OptionController {

    private OptionService os;

    public OptionController(OptionService os) {
        this.os = os;
    }

    @PostMapping("/location")
    public ResponseEntity<String> saveLocationOption(@RequestBody LocationOptionDTO dto) {
        String key = os.saveLocationOption(dto);
        return ResponseEntity.ok(key);
    }

    @PostMapping("/request")
    public ResponseEntity<String> saveRequestOption(@RequestBody RequestOptionDTO dto) {
        String key = os.saveRequestOption(dto);
        return ResponseEntity.ok(key);
    }

    @GetMapping("/location/all")
    public ResponseEntity<List<LocationOptionDTO>> getAllLocationOptions() {
        List<LocationOptionDTO> result = os.findAllLocationOptions();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/request/all")
    public ResponseEntity<List<RequestOptionDTO>> getAllRequestOptions() {
        List<RequestOptionDTO> result = os.findAllRequestOptions();
        return ResponseEntity.ok(result);
    }
}
