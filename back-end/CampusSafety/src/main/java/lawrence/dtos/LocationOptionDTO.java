package lawrence.dtos;

import lawrence.entities.LocationOption;

public class LocationOptionDTO {
    private int locationOptionID;
    private String locationName;

    public LocationOptionDTO() {}

    public LocationOptionDTO(LocationOption core) {
        this.locationOptionID = core.getLocationOptionID();
        this.locationName = core.getLocationName();
    }

    public int getLocationOptionID() {
        return locationOptionID;
    }

    public void setLocationOptionID(int locationOptionID) {
        this.locationOptionID = locationOptionID;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
