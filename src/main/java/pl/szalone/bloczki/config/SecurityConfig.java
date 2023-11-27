package pl.szalone.bloczki.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.util.Initializable;

//todo finish login/passwd auth
public class SecurityConfig implements Initializable {

  @Override
  public void doInitialize(Javalin app) {
    app.before(handler -> {
      String token = handler.header("Authorization");
      if(token == null) {
        return;
      }
      if(!token.startsWith("Bearer ")) {
        throw new RestException(HttpStatus.FORBIDDEN, "Proper validation required.");
      }
      try {
        Algorithm algorithm = Algorithm.HMAC512(System.getenv("JWT_TOKEN"));
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT jwt = verifier.verify(token.substring(7));
        handler.attribute("session:id", jwt.getIssuer());
        handler.attribute("session:jwtToken", jwt.getToken());
      } catch(JWTVerificationException ignored) {
      }
    });
  }

}
