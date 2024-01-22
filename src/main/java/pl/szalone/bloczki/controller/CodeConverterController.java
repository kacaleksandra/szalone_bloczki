package pl.szalone.bloczki.controller;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.PostCodeConvertDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.service.codeconvert.CodeConverterService;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

public class CodeConverterController implements AppController {

  @Override
  public void doRegisterController(Javalin app, AppComponentLocator<AppService> locator, RequestValidator validator) {
    CodeConverterService service = locator.findComponent(CodeConverterService.class);
    app.post("v1/blocksToCode", ctx -> {
      PostCodeConvertDto dto = ctx.bodyValidator(PostCodeConvertDto.class)
        .check(obj -> obj.getSchematicId() != null, "Podaj id schematu")
        .get();
      User user = validator.doValidateCredentials(ctx);
      ctx.json(service.convertToPython(user, dto));
    });
  }
}
