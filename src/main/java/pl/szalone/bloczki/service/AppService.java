package pl.szalone.bloczki.service;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

public interface AppService {

  void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator);

}
