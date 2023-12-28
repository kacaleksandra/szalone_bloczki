package pl.szalone.bloczki.service.login;

import pl.szalone.bloczki.domain.user.dto.PostCredentialsDto;
import pl.szalone.bloczki.domain.user.dto.PostRefreshCredentialsDto;
import pl.szalone.bloczki.service.AppService;

import java.util.Map;

public interface LoginService extends AppService {

  Map<String, Object> postRegister(PostCredentialsDto dto);

  Map<String, Object> postAuthentication(PostCredentialsDto dto);

  Map<String, Object> requestRefresh(PostRefreshCredentialsDto dto);

}
