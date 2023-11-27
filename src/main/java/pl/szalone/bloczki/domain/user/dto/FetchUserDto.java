package pl.szalone.bloczki.domain.user.dto;

import lombok.Getter;
import pl.szalone.bloczki.domain.EmittableDto;
import pl.szalone.bloczki.domain.user.User;

@Getter
public class FetchUserDto implements EmittableDto<FetchUserDto, User> {

  private String username;

  @Override
  public FetchUserDto from(User entity) {
    this.username = entity.getUsername();
    return this;
  }
}
