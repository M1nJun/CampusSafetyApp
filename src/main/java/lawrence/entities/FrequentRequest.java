package lawrence.entities;

import jakarta.persistence.*;

@Entity
@Table(name="frequentRequests")
public class FrequentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer frequentRequestID;
    private String requestType;
    private String requestTitle;

    public FrequentRequest() {}

    public Integer getFrequentRequestID() {
        return frequentRequestID;
    }

    public void setFrequentRequestID(Integer frequentRequestID) {
        this.frequentRequestID = frequentRequestID;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getRequestTitle() {
        return requestTitle;
    }

    public void setRequestTitle(String requestTitle) {
        this.requestTitle = requestTitle;
    }
}
