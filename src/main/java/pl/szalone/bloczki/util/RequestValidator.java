package pl.szalone.bloczki.util;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.user.UserRepository;

//todo finish login/passwd auth
public class RequestValidator {

  private final UserRepository userRepository;

  public RequestValidator(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User doValidateCredentials(Context ctx) {
    String login = ctx.attribute("session:id");
    if(login == null) {
      throw new RestException(HttpStatus.FORBIDDEN, "Authorization is required to access this content.");
    }
    return userRepository.findByLogin(login).orElseThrow(() -> new RestException(HttpStatus.FORBIDDEN, "Invalid authorization."));
  }

}
