package pl.szalone.bloczki.controller;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.service.user.UserService;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

public class UserController implements AppController {

  @Override
  public void doRegisterController(Javalin app, AppComponentLocator<AppService> locator, RequestValidator validator) {
    UserService service = locator.findComponent(UserService.class);
    app.get("v1/users/@me", ctx -> {
      User user = validator.doValidateCredentials(ctx);
      ctx.json(service.getSelf(user));
    });
  }
}
