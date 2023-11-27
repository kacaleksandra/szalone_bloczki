package pl.szalone.bloczki.controller;

import io.javalin.Javalin;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

public interface AppController {

  void doRegisterController(Javalin app, AppComponentLocator<AppService> locator, RequestValidator requestValidator);


}
