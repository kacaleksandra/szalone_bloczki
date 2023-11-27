package pl.szalone.bloczki.exception;

import io.javalin.http.HttpStatus;

public class RestException extends RuntimeException {

  private final HttpStatus httpStatus;

  public RestException(HttpStatus status) {
    super();
    this.httpStatus = status;
  }

  public RestException(HttpStatus status, String message) {
    super(message);
    this.httpStatus = status;
  }

  public HttpStatus getHttpStatus() {
    return httpStatus;
  }

}
