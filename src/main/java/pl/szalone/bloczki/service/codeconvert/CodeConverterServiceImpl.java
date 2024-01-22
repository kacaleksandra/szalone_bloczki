package pl.szalone.bloczki.service.codeconvert;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.ebeaninternal.server.expression.Op;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.PostCodeConvertDto;
import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.exception.RestException;
import pl.szalone.bloczki.repository.AppRepository;
import pl.szalone.bloczki.repository.schematic.SchematicRepository;
import pl.szalone.bloczki.util.AppComponentLocator;

import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

public class CodeConverterServiceImpl implements CodeConverterService {

  private final Gson gson = new Gson();
  private SchematicRepository schematicRepository;

  @Override
  public void doRegisterService(Javalin app, AppComponentLocator<AppRepository<? extends AppEntity, Long>> locator) {
    this.schematicRepository = locator.findComponent(SchematicRepository.class);
  }

  @Override
  public Map<String, Object> convertToPython(User user, PostCodeConvertDto dto) {
    Schematic schematic = schematicRepository.findById(dto.getSchematicId())
      .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "Nie ma takiego schematu."));
    if (!schematic.getUser().equals(user)) {
      throw new RestException(HttpStatus.BAD_REQUEST, "To nie twoj schemat.");
    }
    JsonArray array = gson.fromJson(schematic.getData(), JsonArray.class);
    List<String> lines = new ArrayList<>();
    int deepLevel = 0;
    for (JsonElement element : array.asList()) {
      JsonObject object = element.getAsJsonObject();
      getLineCode(object, lines, deepLevel);
    }
    Map<String, Object> data = new HashMap<>();
    data.put("data", lines);
    return data;
  }

  private List<String> getLineCode(JsonObject object, List<String> data, int deepLevel) {
    Operations operation = Operations.getById(object.get("id").getAsInt());
    JsonArray valuesArray = object.get("valuesArray").getAsJsonArray();
    data.add("  ".repeat(deepLevel) + MessageFormat.format(operation.getCode(), doFormatValues(operation, valuesArray.asList())));
    if (!object.get("inside").getAsJsonArray().isEmpty()) {
      for(JsonElement element : object.get("inside").getAsJsonArray().asList()) {
        return getLineCode(element.getAsJsonObject(), data, deepLevel + 1);
      }
    }
    return data;
  }

  private Object[] doFormatValues(Operations operation, List<JsonElement> formatValues) {
    List<String> values = new ArrayList<>();
    if(operation == Operations.CREATE_RANDOM_ARR) {
      StringJoiner joiner = new StringJoiner(",");
      for(int i = 0; i < formatValues.get(0).getAsInt(); i++) {
        joiner.add(String.valueOf(i));
      }
      values.add(joiner.toString());
      return values.toArray();
    }
    for(JsonElement element : formatValues) {
      try {
        values.add(EqualityOperators.getById(element.getAsInt()).getCode());
      } catch (Exception ex) {
        values.add(element.getAsString());
      }
    }
    return values.toArray();
  }

  @Getter
  @AllArgsConstructor
  public enum Operations {
    PRINT_TEXT(0, "print(''{0}'')"), PRINT_VAR(1, "print({0})"), SET_VAR(2, "{0} = ''{1}''"),
    CONDITIONAL(3, "if {0} {1} {2}:"), WHILE(4, "while {0} {1} {2}:"), CREATE_ARR(5, "{0} = []"),
    CREATE_RANDOM_ARR(6, "{0} = [{1}]"), ASSIGN_TO_ARR(7, "{0}[{1}] = {2}"), PUSH_TO_ARR(8, "{0}.append({1})"),
    REMOVE_FROM_ARR(9, "{0}.remove({1})");

    public static Operations getById(int id) {
      for (Operations operation : Operations.values()) {
        if (operation.getId() == id) {
          return operation;
        }
      }
      return null;
    }

    private final int id;
    private final String code;
  }

  @Getter
  @AllArgsConstructor
  public enum EqualityOperators {
    EQUALS(0, "=="), NOT_EQUALS(1, "!="), HIGHER(2, ">"), LOWER(3, "<"), HIGHER_EQ(4, ">="), LOWER_EQ(5, "<=");

    public static EqualityOperators getById(int id) {
      for (EqualityOperators operation : EqualityOperators.values()) {
        if (operation.getId() == id) {
          return operation;
        }
      }
      return null;
    }

    private final int id;
    private final String code;
  }

}
