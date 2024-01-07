package pl.szalone.bloczki.controller;

import io.javalin.Javalin;
import jakarta.servlet.http.HttpServletResponse;
import pl.szalone.bloczki.domain.schematic.dto.PostSchematicDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.service.schematic.SchematicService;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

public class SchematicController implements AppController {

  @Override
  public void doRegisterController(Javalin app, AppComponentLocator<AppService> locator, RequestValidator validator) {
    SchematicService service = locator.findComponent(SchematicService.class);
    app.post("v1/convert", ctx -> {
      ctx.result(service.doConvertImageToPdf(ctx.bodyAsBytes()));
    }).get("v1/schematics", ctx -> {
      User user = validator.doValidateCredentials(ctx);
      ctx.json(service.getSchematics(user));
    }).post("v1/schematics", ctx -> {
      User user = validator.doValidateCredentials(ctx);
      PostSchematicDto dto = ctx.bodyValidator(PostSchematicDto.class).check(obj -> obj.getData() != null, "Data cannot be null").get();
      ctx.json(service.postSchematic(user, dto));
    }).delete("v1/schematics/{id}", ctx -> {
      User user = validator.doValidateCredentials(ctx);
      service.deleteSchematic(user, Long.parseLong(ctx.pathParam("id")));
      ctx.res().setStatus(HttpServletResponse.SC_OK);
    });
  }
}
