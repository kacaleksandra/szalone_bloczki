package pl.szalone.bloczki.service.codeconvert;

import pl.szalone.bloczki.domain.PostCodeConvertDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.service.AppService;

import java.util.Map;

public interface CodeConverterService extends AppService {

  Map<String, Object> convertToPython(User user, PostCodeConvertDto dto);

}
