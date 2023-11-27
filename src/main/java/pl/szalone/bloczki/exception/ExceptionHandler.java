package pl.szalone.bloczki.exception;

import io.javalin.Javalin;
import pl.szalone.bloczki.util.Initializable;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public class ExceptionHandler implements Initializable {

  @Override
  public void doInitialize(Javalin app) {
    app.exception(RestException.class, (ex, ctx) -> {
      Map<String, Object> body = new LinkedHashMap<>();
      body.put("status", ex.getHttpStatus());
      body.put("errors", Collections.singletonList(ex.getMessage()));
      ctx.json(body).status(ex.getHttpStatus());
    });
  }

}
