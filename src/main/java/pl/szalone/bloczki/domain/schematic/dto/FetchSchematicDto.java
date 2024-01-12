package pl.szalone.bloczki.domain.schematic.dto;

import lombok.Getter;
import pl.szalone.bloczki.domain.EmittableDto;
import pl.szalone.bloczki.domain.schematic.Schematic;

@Getter
public class FetchSchematicDto implements EmittableDto<FetchSchematicDto, Schematic> {

  private long id;
  private String name;
  private String description;
  private String data;

  @Override
  public FetchSchematicDto from(Schematic entity) {
    this.id = entity.getId();
    this.name = entity.getName();
    this.description = entity.getDescription();
    this.data = entity.getData();
    return this;
  }
}
