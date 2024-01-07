package pl.szalone.bloczki.service.schematic;

import pl.szalone.bloczki.domain.schematic.dto.FetchSchematicDto;
import pl.szalone.bloczki.domain.schematic.dto.PostSchematicDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;

import java.util.List;

public interface SchematicService extends AppService {

  List<FetchSchematicDto> getSchematics(User user);

  FetchSchematicDto postSchematic(User user, PostSchematicDto dto);

  boolean deleteSchematic(User user, long id);

  byte[] doConvertImageToPdf(byte[] imageBytes);

}
