package pl.szalone.bloczki.service.schematic;

import pl.szalone.bloczki.service.AppService;

public interface SchematicService extends AppService {

  byte[] doConvertImageToPdf(byte[] imageBytes);

}
