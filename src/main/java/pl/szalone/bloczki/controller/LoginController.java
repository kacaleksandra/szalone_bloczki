package pl.szalone.bloczki.controller;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.user.dto.PostCredentialsDto;
import pl.szalone.bloczki.domain.user.dto.PostRefreshCredentialsDto;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.service.login.LoginService;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

public class LoginController implements AppController {

  @Override
  public void doRegisterController(Javalin app, AppComponentLocator<AppService> locator, RequestValidator requestValidator) {
    LoginService loginService = locator.findComponent(LoginService.class);
    app.post("v1/service/login", ctx -> {
          PostCredentialsDto dto = ctx.bodyValidator(PostCredentialsDto.class)
              .check(obj -> obj.getLogin() != null, "Login must be set")
              .check(obj -> obj.getPassword() != null, "Password must be set")
              .get();
          ctx.json(loginService.postAuthentication(dto));
        })
        .post("v1/service/register", ctx -> {
          PostCredentialsDto dto = ctx.bodyValidator(PostCredentialsDto.class)
              .check(obj -> obj.getLogin() != null, "Login must be set")
              .check(obj -> obj.getPassword() != null, "Password must be set")
              .get();
          ctx.json(loginService.postRegister(dto));
        })
        .post("v1/service/refresh", ctx -> {
          PostRefreshCredentialsDto dto = ctx.bodyValidator(PostRefreshCredentialsDto.class)
              .check(obj -> obj.getLogin() != null, "Login must be set")
              .check(obj -> obj.getRefreshToken() != null, "Refresh token must be set")
              .get();
          ctx.json(loginService.requestRefresh(dto));
        });
  }
}
