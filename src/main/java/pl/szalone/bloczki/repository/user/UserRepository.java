package pl.szalone.bloczki.repository.user;

import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.repository.AppRepository;

import java.util.Optional;

public interface UserRepository extends AppRepository<User, Long> {

  Optional<User> findByLogin(String login);

  Optional<User> findByCredentials(String login, String password);

}
