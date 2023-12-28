package pl.szalone.bloczki.repository.user;

import at.favre.lib.crypto.bcrypt.BCrypt;
import io.ebean.DB;
import pl.szalone.bloczki.domain.user.User;
import pl.szalone.bloczki.repository.GenericAppRepository;

import java.util.Optional;

public class UserRepositoryImpl extends GenericAppRepository<User> implements UserRepository {

  public UserRepositoryImpl() {
    super(User.class);
  }

  @Override
  public Optional<User> findByLogin(String login) {
    return DB.find(User.class)
        .where()
        .eq("login", login)
        .findOneOrEmpty();
  }

  @Override
  public Optional<User> findByCredentials(String login, String password) {
    Optional<User> user = DB.find(User.class)
        .where()
        .eq("login", login)
        .findOneOrEmpty();
    if(user.isEmpty() || BCrypt.verifyer().verify(password.toCharArray(), user.get().getPassword()).verified) {
      return Optional.empty();
    }
    return user;
  }

}
