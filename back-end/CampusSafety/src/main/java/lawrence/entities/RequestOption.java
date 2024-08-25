package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.RequestOptionDTO;

@Entity
@Table(name="RequestOptions")
public class RequestOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestOptionID;
    private String requestTitle;

    public RequestOption() {}

    public RequestOption(RequestOptionDTO core) {
        this.requestTitle = core.getRequestTitle();
    }

    public Integer getRequestOptionID() {
        return requestOptionID;
    }

    public void setRequestOptionID(Integer RequestOptionID) {
        this.requestOptionID = requestOptionID;
    }


    public String getRequestTitle() {
        return requestTitle;
    }

    public void setRequestTitle(String requestTitle) {
        this.requestTitle = requestTitle;
    }
}
