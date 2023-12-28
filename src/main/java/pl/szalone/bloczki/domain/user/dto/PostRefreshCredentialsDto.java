package pl.szalone.bloczki.domain.user.dto;

import lombok.Getter;

@Getter
public class PostRefreshCredentialsDto {

  private String login;
  private String refreshToken;

}
