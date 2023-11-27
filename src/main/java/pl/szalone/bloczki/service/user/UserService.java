package pl.szalone.bloczki.service.user;

import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.domain.user.dto.FetchUserDto;

public interface UserService {

  FetchUserDto getSelf(User user);

}
