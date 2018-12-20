package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Disciplina;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Disciplina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {

    @Query(value = "select distinct disciplina from Disciplina disciplina left join fetch disciplina.professors",
        countQuery = "select count(distinct disciplina) from Disciplina disciplina")
    Page<Disciplina> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct disciplina from Disciplina disciplina left join fetch disciplina.professors")
    List<Disciplina> findAllWithEagerRelationships();

    @Query("select disciplina from Disciplina disciplina left join fetch disciplina.professors where disciplina.id =:id")
    Optional<Disciplina> findOneWithEagerRelationships(@Param("id") Long id);

}
