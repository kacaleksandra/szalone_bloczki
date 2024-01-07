package pl.szalone.bloczki.service.user;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.domain.user.dto.FetchUserDto;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

public class UserServiceImpl implements UserService {

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {
  }

  @Override
  public FetchUserDto getSelf(User user) {
    return user.toFetchDto();
  }
}
