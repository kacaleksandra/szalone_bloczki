package pl.szalone.bloczki.domain.user;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import pl.szalone.bloczki.domain.AppEntity;
import pl.szalone.bloczki.domain.Messageable;
import pl.szalone.bloczki.domain.schematic.Schematic;
import pl.szalone.bloczki.domain.user.dto.FetchUserDto;
import pl.szalone.bloczki.repository.user.UserRepository;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Accessors(chain = true)
public class User extends AppEntity<UserRepository> implements Messageable<FetchUserDto> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String username;
  private String login;
  private String password;
  private String refreshToken;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
  private List<Schematic> schematics;

  @Override
  public User save(UserRepository repository) {
    return repository.save(this);
  }

  @Override
  public FetchUserDto toFetchDto() {
    return new FetchUserDto().from(this);
  }

}
