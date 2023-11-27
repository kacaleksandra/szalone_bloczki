package pl.szalone.bloczki;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;

public class Main {

  public static void main(String[] args) {
    //override default logging mechanism
    System.setProperty("org.jboss.logging.provider", "slf4j");
    Logger root = (ch.qos.logback.classic.Logger) org.slf4j.LoggerFactory.getLogger(ch.qos.logback.classic.Logger.ROOT_LOGGER_NAME);
    root.setLevel(Level.INFO);
    System.setProperty("java.util.logging.SimpleFormatter.format", "%1$tH:%1$tM:%1$tS.%1$tL [%3$s] %4$s %5$s%6$s%n");

    ch.qos.logback.classic.Logger ebean = (ch.qos.logback.classic.Logger) org.slf4j.LoggerFactory.getLogger("io.ebean.SQL");
    ebean.setLevel(Level.DEBUG);
    new BloczkiApplication(args);
  }

}
