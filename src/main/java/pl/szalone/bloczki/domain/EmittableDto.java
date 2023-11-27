package pl.szalone.bloczki.domain;

public interface EmittableDto<K, L>{

  K from(L entity);

}
