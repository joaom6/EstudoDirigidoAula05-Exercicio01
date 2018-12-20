package org.jhipster.blog.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.jhipster.blog.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.blog.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Permissao.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Permissao.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Pessoa.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Aluno.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Aluno.class.getName() + ".faltas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Aluno.class.getName() + ".notas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Aluno.class.getName() + ".entregas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Professor.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Professor.class.getName() + ".turmas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Professor.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Professor.class.getName() + ".disciplinas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Falta.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Nota.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Nota.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Turma.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Turma.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Turma.class.getName() + ".aulas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Disciplina.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Disciplina.class.getName() + ".professors", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Disciplina.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Aula.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Atividade.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Entrega.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Entrega.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.Entrega.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.PeriodoLetivo.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.PeriodoLetivo.class.getName() + ".aulas", jcacheConfiguration);
            cm.createCache(org.jhipster.blog.domain.PeriodoLetivo.class.getName() + ".faltas", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
