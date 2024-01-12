package pl.szalone.bloczki.service.codeconvert;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

public class CodeConverterServiceImpl implements CodeConverterService {

  private Gson gson = new Gson();

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {
  }

  @Override
  public String convertToPython(User user, Schematic schematic) {
    if(!schematic.getUser().equals(user)) {
      throw new RestException(HttpStatus.BAD_REQUEST, "To nie twoj schemat.");
    }
    JsonObject object = gson.fromJson(schematic.getData(), JsonObject.class);
    return null;
  }

}
