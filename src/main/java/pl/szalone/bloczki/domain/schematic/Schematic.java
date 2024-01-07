package pl.szalone.bloczki.domain.schematic;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.Messageable;
import pl.szalone.bloczki.domain.schematic.dto.FetchSchematicDto;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.repository.schematic.SchematicRepository;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Accessors(chain = true)
public class Schematic extends AppEntity<SchematicRepository> implements Messageable<FetchSchematicDto> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @ManyToOne
  private User user;
  @Column(columnDefinition = "TEXT")
  private String data;

  @Override
  public Schematic save(SchematicRepository repository) {
    return repository.save(this);
  }

  @Override
  public FetchSchematicDto toFetchDto() {
    return new FetchSchematicDto().from(this);
  }
}
