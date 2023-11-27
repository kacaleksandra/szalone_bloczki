package pl.szalone.bloczki.domain;

import io.ebean.Model;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AppEntity<K> extends Model {

  public abstract Long getId();

  public abstract AppEntity<K> save(K repository);

}
