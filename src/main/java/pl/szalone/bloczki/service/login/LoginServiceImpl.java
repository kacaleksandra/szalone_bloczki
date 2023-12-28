package pl.szalone.bloczki.service.login;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.domain.user.dto.PostCredentialsDto;
import pl.szalone.bloczki.domain.user.dto.PostRefreshCredentialsDto;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.repository.user.UserRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class LoginServiceImpl implements LoginService {

  private UserRepository userRepository;

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {
    this.userRepository = locator.findComponent(UserRepository.class);
  }

  @Override
  public Map<String, Object> postRegister(PostCredentialsDto dto) {
    if(userRepository.findByLogin(dto.getLogin()).isPresent()) {
      throw new RestException(HttpStatus.BAD_REQUEST, "Konto z tym loginem już istnieje!");
    }
    UUID refreshToken = UUID.randomUUID();
    User user = new User()
        .setLogin(dto.getLogin())
        .setUsername(dto.getLogin())
        .setPassword(BCrypt.withDefaults().hashToString(12, dto.getPassword().toCharArray()))
        .setRefreshToken(BCrypt.withDefaults().hashToString(12, refreshToken.toString().toCharArray()))
        .save(userRepository);
    String token = JWT.create()
        .withIssuer(user.getLogin())
        .withIssuedAt(Instant.now())
        .withExpiresAt(Instant.now().plus(7, TimeUnit.DAYS.toChronoUnit()))
        .sign(Algorithm.HMAC512(System.getenv("JWT_SECRET")));
    Map<String, Object> data = new HashMap<>();
    data.put("access_token", token);
    data.put("refresh_token", user.getRefreshToken());
    data.put("user", user.toFetchDto());
    return data;
  }

  @Override
  public Map<String, Object> postAuthentication(PostCredentialsDto dto) {
    User user = userRepository.findByLogin(dto.getLogin())
        .orElseThrow(() -> new RestException(HttpStatus.FORBIDDEN, "Takie konto nie istnieje!"));
    if(!BCrypt.verifyer().verify(dto.getPassword().toCharArray(), user.getPassword()).verified) {
      throw new RestException(HttpStatus.FORBIDDEN, "Błędne hasło!");
    }
    return doGenerateData(user);
  }

  @Override
  public Map<String, Object> requestRefresh(PostRefreshCredentialsDto dto) {
    User user = userRepository.findByLogin(dto.getLogin())
        .orElseThrow(() -> new RestException(HttpStatus.FORBIDDEN, "Takie konto nie istnieje!"));
    if(!BCrypt.verifyer().verify(dto.getRefreshToken().toCharArray(), user.getRefreshToken()).verified) {
      throw new RestException(HttpStatus.FORBIDDEN, "Błędne hasło!");
    }
    return doGenerateData(user);
  }

  private Map<String, Object> doGenerateData(User user) {
    UUID refreshToken = UUID.randomUUID();
    String token = JWT.create()
        .withIssuer(user.getLogin())
        .withIssuedAt(Instant.now())
        .withExpiresAt(Instant.now().plus(7, TimeUnit.DAYS.toChronoUnit()))
        .sign(Algorithm.HMAC512(System.getenv("JWT_SECRET")));
    user.setRefreshToken(BCrypt.withDefaults().hashToString(12, refreshToken.toString().toCharArray()))
        .save(userRepository);
    Map<String, Object> data = new HashMap<>();
    data.put("access_token", token);
    data.put("refresh_token", user.getRefreshToken());
    data.put("user", user.toFetchDto());
    return data;
  }
}
