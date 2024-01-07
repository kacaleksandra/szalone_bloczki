package pl.szalone.bloczki.repository.schematic;

import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.repository.AppRepository;

import java.util.List;
import java.util.Optional;

public interface SchematicRepository extends AppRepository<Schematic, Long> {

  List<Schematic> findByUser(User user);

  Optional<Schematic> findByDataAndUser(String data, User user);

}
