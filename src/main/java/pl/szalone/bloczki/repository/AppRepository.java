package pl.szalone.bloczki.repository;

import io.ebean.FetchGroup;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface AppRepository<E, I> {

  List<E> findByIds(Collection<I> ids);

  List<E> findByIds(Collection<I> ids, @Nullable FetchGroup<E> fetchGroup);

  List<E> findAll();

  List<E> findAll(@Nullable FetchGroup<E> fetchGroup);

  Optional<E> findById(I id);

  Optional<E> findById(I id, @Nullable FetchGroup<E> fetchGroup);

  E save(E entity);

  Collection<E> saveAll(Collection<E> entities);

  void delete(E entity);

  void deleteAll(Collection<E> entities);

}
