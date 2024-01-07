package pl.szalone.bloczki.domain.schematic.dto;

import lombok.Getter;
import pl.szalone.bloczki.domain.EmittableDto;
import pl.szalone.bloczki.domain.schematic.Schematic;

@Getter
public class FetchSchematicDto implements EmittableDto<FetchSchematicDto, Schematic> {

  private long id;
  private String data;

  @Override
  public FetchSchematicDto from(Schematic entity) {
    this.id = entity.getId();
    this.data = entity.getData();
    return this;
  }
}
