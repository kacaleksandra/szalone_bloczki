package pl.szalone.bloczki.service.codeconvert;

import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;

public interface CodeConverterService extends AppService {

  String convertToPython(User user, Schematic schematic);

}
