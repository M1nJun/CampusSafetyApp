package lawrence.dtos;

import lawrence.entities.OfficerDriverOption;

public class OfficerDriverOptionDTO {
    private int OfficerDriverOptionID;
    private String firstname;
    private String lastname;
    private String type;

    public OfficerDriverOptionDTO() {}

    public OfficerDriverOptionDTO(OfficerDriverOption core) {
        this.OfficerDriverOptionID = core.getOfficerDriverOptionID();
        this.firstname = core.getFirstname();
        this.lastname = core.getLastname();
        this.type = core.getType();
    }

    public int getOfficerDriverOptionID() {
        return OfficerDriverOptionID;
    }

    public void setOfficerDriverOptionID(int officerDriverOptionID) {
        OfficerDriverOptionID = officerDriverOptionID;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
