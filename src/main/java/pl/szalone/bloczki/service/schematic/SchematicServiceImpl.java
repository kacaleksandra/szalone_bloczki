package pl.szalone.bloczki.service.schematic;

import io.javalin.Javalin;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

public class SchematicServiceImpl implements SchematicService {

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {

  }

  @Override
  public byte[] doConvertImageToPdf(byte[] imageBytes) {
    return new byte[0];
  }
}
