package pl.szalone.bloczki.service.user;

import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.domain.user.dto.FetchUserDto;
import pl.szalone.bloczki.service.AppService;

public interface UserService extends AppService {

  FetchUserDto getSelf(User user);

}
