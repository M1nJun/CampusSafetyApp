package lawrence.services;

import lawrence.dtos.LocationOptionDTO;
import lawrence.dtos.OfficerDriverOptionDTO;
import lawrence.dtos.RequestOptionDTO;
import lawrence.entities.LocationOption;
import lawrence.entities.OfficerDriverOption;
import lawrence.entities.RequestOption;
import lawrence.repositories.LocationOptionRepository;
import lawrence.repositories.OfficerDriverOptionRepository;
import lawrence.repositories.RequestOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class OptionService {
    @Autowired
    LocationOptionRepository locationOptionRepository;

    @Autowired
    RequestOptionRepository requestOptionRepository;

    @Autowired
    OfficerDriverOptionRepository officerDriverOptionRepository;

    public String saveLocationOption(LocationOptionDTO dto) {
        LocationOption newLocationOption = new LocationOption(dto);
        locationOptionRepository.save(newLocationOption);
        return newLocationOption.getLocationOptionID().toString();
    }

    public String saveRequestOption(RequestOptionDTO dto) {
        RequestOption newRequestOption = new RequestOption(dto);
        requestOptionRepository.save(newRequestOption);
        return newRequestOption.getRequestOptionID().toString();
    }

    public List<LocationOptionDTO> findAllLocationOptions() {
        List<LocationOption> locationOptions = locationOptionRepository.findAll();
        List<LocationOptionDTO> dtos = new ArrayList<>();
        for (LocationOption locationOption : locationOptions) {
            dtos.add(new LocationOptionDTO(locationOption));
        }
        return dtos;
    }

    public List<RequestOptionDTO> findAllRequestOptions() {
        List<RequestOption> requestOptions = requestOptionRepository.findAll();
        List<RequestOptionDTO> dtos = new ArrayList<>();
        for (RequestOption requestOption : requestOptions) {
            dtos.add(new RequestOptionDTO(requestOption));
        }
        return dtos;
    }

    public List<LocationOptionDTO> findLocationOptionsByKeyword(String keyword) {
        List<LocationOption> locationOptions = locationOptionRepository.findByLocationNameContainingIgnoreCase(keyword);
        List<LocationOptionDTO> dtos = new ArrayList<>();
        for (LocationOption locationOption : locationOptions) {
            dtos.add(new LocationOptionDTO(locationOption));
        }
        return dtos;
    }

    // to save and fetch names of officers/drivers

    public String saveOfficerDriverOption(OfficerDriverOptionDTO dto) {
        OfficerDriverOption newOfficerDriverOption = new OfficerDriverOption(dto);
        officerDriverOptionRepository.save(newOfficerDriverOption);
        return newOfficerDriverOption.getOfficerDriverOptionID().toString();
    }

    public List<OfficerDriverOptionDTO> findAllOfficerDriverOptions() {
        List<OfficerDriverOption> officerDriverOptions = officerDriverOptionRepository.findAll();
        List<OfficerDriverOptionDTO> dtos = new ArrayList<>();
        for (OfficerDriverOption officerDriverOption : officerDriverOptions) {
            dtos.add(new OfficerDriverOptionDTO(officerDriverOption));
        }
        return dtos;
    }

}
