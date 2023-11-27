package pl.szalone.bloczki.exception;

public class ApplicationInitializeException extends RuntimeException {

  public ApplicationInitializeException() {
    super();
  }

  public ApplicationInitializeException(String message) {
    super(message);
  }

}
