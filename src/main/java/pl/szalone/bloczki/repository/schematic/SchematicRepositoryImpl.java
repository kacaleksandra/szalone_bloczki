package pl.szalone.bloczki.repository.schematic;

import io.ebean.DB;
import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.repository.GenericAppRepository;

import java.util.List;
import java.util.Optional;

public class SchematicRepositoryImpl extends GenericAppRepository<Schematic> implements SchematicRepository {

  public SchematicRepositoryImpl() {
    super(Schematic.class);
  }

  @Override
  public List<Schematic> findByUser(User user) {
    return DB.find(Schematic.class)
        .where()
        .eq("user", user)
        .findList();
  }

  @Override
  public Optional<Schematic> findByDataAndUser(String data, User user) {
    return DB.find(Schematic.class)
        .where()
        .eq("user", user)
        .and()
        .eq("data", data)
        .findOneOrEmpty();
  }
}
