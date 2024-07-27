package lawrence.services;

import lawrence.dtos.RequestDTO;
import lawrence.entities.Request;
import lawrence.entities.User;
import lawrence.repositories.RequestRepository;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    UserRepository userRepository;

    public String save(RequestDTO request) {
        Request newRequest = new Request(request);
        Optional<User> maybeUser = userRepository.findById(UUID.fromString(request.getRequester()));
        if(!maybeUser.isPresent()) {
            return "Bad Id";
        }
        User user = maybeUser.get();
        // Not sure if I'm setting the Requester twice. Room for improvement.
        newRequest.setRequester(user);
        requestRepository.save(newRequest);
        return newRequest.getRequestID().toString();
    }
}
