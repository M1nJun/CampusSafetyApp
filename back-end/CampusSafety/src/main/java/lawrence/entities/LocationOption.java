package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.LocationOptionDTO;

@Entity
@Table(name="LocationOptions")
public class LocationOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer locationOptionID;
    private String locationName;

    public LocationOption() {}

    public LocationOption(LocationOptionDTO core) {
        this.locationName = core.getLocationName();
    }

    public Integer getLocationOptionID() {
        return locationOptionID;
    }

    public void setLocationOptionID(Integer locationOptionID) {
        this.locationOptionID = locationOptionID;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
