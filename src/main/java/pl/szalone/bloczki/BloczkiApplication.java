package pl.szalone.bloczki;

import ch.qos.logback.classic.Level;
import io.ebean.Database;
import io.ebean.DatabaseFactory;
import io.ebean.config.DatabaseConfig;
import io.ebean.datasource.DataSourceConfig;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import io.javalin.plugin.bundled.CorsPluginConfig;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pl.szalone.bloczki.config.SecurityConfig;
import pl.szalone.bloczki.controller.AppController;
import pl.szalone.bloczki.controller.LoginController;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.exception.ExceptionHandler;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.repository.user.UserRepository;
import pl.szalone.bloczki.repository.user.UserRepositoryImpl;
import pl.szalone.bloczki.service.AppService;
import pl.szalone.bloczki.service.login.LoginServiceImpl;
import pl.szalone.bloczki.service.schematic.SchematicServiceImpl;
import pl.szalone.bloczki.util.AppComponentLocator;
import pl.szalone.bloczki.util.RequestValidator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BloczkiApplication {

  public static final Logger LOGGER = LoggerFactory.getLogger("App");

  private final AppComponentLocator<AppService> servicesLocator = new AppComponentLocator<>();
  private final AppComponentLocator<AppRepository<? extends AppEntity, Long>> repositoriesLocator = new AppComponentLocator<>();
  private final List<AppController> controllers = new ArrayList<>();
  private final List<AppService> services = new ArrayList<>();
  private final List<AppRepository<? extends AppEntity, Long>> repositories = new ArrayList<>();
  private final Javalin app;
  private Database database;

  @SneakyThrows
  public BloczkiApplication(String[] args) {
    long start = System.currentTimeMillis();
    boolean devMode = Arrays.asList(args).contains("devMode");
    if (devMode) {
      LOGGER.info("[❗] Initializing development mode.");
      ch.qos.logback.classic.Logger ebeanLogger = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger("io.ebean.SQL");
      ebeanLogger.setLevel(Level.DEBUG);
    }

    this.app = Javalin.create(config -> {
      config.showJavalinBanner = false;
      config.compression.gzipOnly();
      config.http.defaultContentType = "application/json";
      config.routing.contextPath = devMode ? "/api" : "/";
      config.plugins.enableCors(cors -> cors.add(CorsPluginConfig::anyHost));
    });
    app.error(HttpStatus.NOT_FOUND, ctx -> {
      throw new RestException(HttpStatus.NOT_FOUND, "Route '" + ctx.path() + "' not found.");
    }).error(HttpStatus.INTERNAL_SERVER_ERROR, ctx -> {
      throw new RestException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error occurred.");
    });
    doInitializeApp(app);
    LOGGER.info("[…] Core initialized in " + (System.currentTimeMillis() - start) + "ms");
    app.start(8080);

    doPrepareShutdownHook();
    LOGGER.info("[✔] Application started in " + (System.currentTimeMillis() - start) + "ms");
  }

  private void doInitializeApp(Javalin app) {
    new ExceptionHandler().doInitialize(app);
    new SecurityConfig().doInitialize(app);

    this.database = DatabaseFactory.create(getDatabaseConfig());
    //database logic layer - repositories
    doRegisterRepositories();
    //business logic layer - services
    doRegisterServices(app);
    //api serve logic - controllers
    doRegisterControllers(app);
  }

  private DatabaseConfig getDatabaseConfig() {
    DataSourceConfig source = new DataSourceConfig();
    source.setDriver(com.mysql.cj.jdbc.Driver.class.getName());
    source.setUrl(System.getenv("MYSQL_URL"));
    source.setUsername(System.getenv("MYSQL_USERNAME"));
    source.setPassword(System.getenv("MYSQL_PASSWORD"));

    DatabaseConfig config = new DatabaseConfig();
    config.addPackage("net.ionide.app");
    /*config.setDdlRun(true);
    config.setDdlGenerate(true);
    config.setDdlCreateOnly(true);*/
    config.setDataSourceConfig(source);
    config.setSlowQueryListener(listener -> LOGGER.info("[❗] Slow query detected (" + listener.getTimeMillis() + "ms): " + listener.getSql()));
    config.setSlowQueryMillis(100);
    return config;
  }

  private void doRegisterRepositories() {
    repositories.add(new UserRepositoryImpl());
    repositoriesLocator.fillComponents(repositories);
  }

  private void doRegisterServices(Javalin app) {
    services.add(new LoginServiceImpl());
    services.add(new SchematicServiceImpl());
    servicesLocator.fillComponents(services);
    services.forEach(service -> service.doRegisterService(app, repositoriesLocator));
  }

  private void doRegisterControllers(Javalin app) {
    controllers.add(new LoginController());
    RequestValidator validator = new RequestValidator(repositoriesLocator.findComponent(UserRepository.class));

    controllers.forEach(controller -> controller.doRegisterController(app, servicesLocator, validator));
  }

  private void doPrepareShutdownHook() {
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      app.stop();
      database.shutdown();
    }));
  }

}
