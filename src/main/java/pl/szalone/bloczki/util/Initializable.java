package pl.szalone.bloczki.util;

import io.javalin.Javalin;

public interface Initializable {

  void doInitialize(Javalin app);

}
