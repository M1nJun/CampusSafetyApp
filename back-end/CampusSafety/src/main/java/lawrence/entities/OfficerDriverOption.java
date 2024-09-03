package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.OfficerDriverOptionDTO;

@Entity
@Table(name="OfficerDriverOptions")
public class OfficerDriverOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer OfficerDriverOptionID;
    private String firstname;
    private String lastname;
    private String type;

    public OfficerDriverOption() {}

    public OfficerDriverOption(OfficerDriverOptionDTO core) {
        this.firstname = core.getFirstname();
        this.lastname = core.getLastname();
        this.type = core.getType();
    }

    public Integer getOfficerDriverOptionID() {
        return OfficerDriverOptionID;
    }

    public void setOfficerDriverOptionID(Integer officerDriverOptionID) {
        OfficerDriverOptionID = officerDriverOptionID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
}
