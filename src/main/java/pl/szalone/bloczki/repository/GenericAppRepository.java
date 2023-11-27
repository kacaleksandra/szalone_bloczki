package pl.szalone.bloczki.repository;

import io.ebean.*;
import org.jetbrains.annotations.Nullable;
import pl.szalone.bloczki.domain.AppEntity;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class GenericAppRepository<K extends AppEntity> implements AppRepository<K, Long> {

  private final Class<K> clazz;

  public GenericAppRepository(Class<K> clazz) {
    this.clazz = clazz;
  }

  @Override
  public List<K> findByIds(Collection<Long> ids) {
    return findByIds(ids, null);
  }

  @Override
  public List<K> findByIds(Collection<Long> ids, @Nullable FetchGroup<K> fetchGroup) {
    Query<K> query = DB.find(clazz);
    if(fetchGroup != null) {
      query = query.select(fetchGroup);
    }
    query = query.where().idIn(ids).query();
    return query.findList();
  }

  @Override
  public List<K> findAll() {
    return findAll(null);
  }

  @Override
  public List<K> findAll(FetchGroup<K> fetchGroup) {
    Query<K> query = DB.find(clazz);
    if(fetchGroup != null) {
      query = query.select(fetchGroup);
    }
    return query.findList();
  }

  @Override
  public Optional<K> findById(Long id) {
    return findById(id, null);
  }

  @Override
  public Optional<K> findById(Long id, @Nullable FetchGroup<K> fetchGroup) {
    Query<K> query = DB.find(clazz).setId(id);
    if(fetchGroup != null) {
      query = query.select(fetchGroup);
    }
    return query.findOneOrEmpty();
  }

  @Override
  public K save(K entity) {
    entity.save();
    return entity;
  }

  @Override
  public Collection<K> saveAll(Collection<K> entities) {
    try(Transaction trans = DB.beginTransaction()) {
      trans.setBatchMode(true);
      trans.setBatchSize(500);

      entities.forEach(Model::save);
      trans.commit();
    }
    return entities;
  }

  @Override
  public void delete(K entity) {
    entity.delete();
  }

  @Override
  public void deleteAll(Collection<K> entities) {
    DB.find(clazz)
        .where()
        .idIn(entities.stream().map(AppEntity::getId).collect(Collectors.toList()))
        .delete();
  }

}
