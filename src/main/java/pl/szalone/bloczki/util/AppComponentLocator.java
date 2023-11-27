package pl.szalone.bloczki.util;

import pl.szalone.bloczki.exception.ApplicationInitializeException;

import java.util.ArrayList;
import java.util.List;

public class AppComponentLocator<K> {

  private boolean filled = false;
  private List<K> components = new ArrayList<>();

  public void fillComponents(List<K> components) {
    if (filled) {
      throw new ApplicationInitializeException("Cannot fill components twice");
    }
    this.components = components;
    this.filled = true;
  }

  public <T> T findComponent(Class<T> clazz) {
    return components.stream()
        .filter(clazz::isInstance)
        .findFirst()
        .map(clazz::cast)
        .orElseThrow(() -> new ApplicationInitializeException("Component '" + clazz.getName() + "' is not registered!"));
  }
}