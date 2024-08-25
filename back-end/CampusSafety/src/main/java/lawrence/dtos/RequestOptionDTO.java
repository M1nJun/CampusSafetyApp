package lawrence.dtos;

import lawrence.entities.RequestOption;

public class RequestOptionDTO {
    private int requestOptionID;
    private String requestTitle;

    public RequestOptionDTO() {}

    public RequestOptionDTO(RequestOption core) {
        this.requestOptionID = core.getRequestOptionID();
        this.requestTitle = core.getRequestTitle();
    }

    public int getRequestOptionID() {
        return requestOptionID;
    }

    public void setRequestOptionID(int requestOptionID) {
        this.requestOptionID = requestOptionID;
    }

    public String getRequestTitle() {
        return requestTitle;
    }

    public void setRequestTitle(String requestTitle) {
        this.requestTitle = requestTitle;
    }
}
