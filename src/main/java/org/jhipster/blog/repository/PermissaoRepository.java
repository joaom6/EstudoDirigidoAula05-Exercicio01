package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Permissao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Permissao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

}
