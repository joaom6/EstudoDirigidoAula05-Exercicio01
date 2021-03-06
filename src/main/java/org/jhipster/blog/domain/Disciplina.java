package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Disciplina.
 */
@Entity
@Table(name = "disciplina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Disciplina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private Long codigo;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "disciplina_professor",
               joinColumns = @JoinColumn(name = "disciplinas_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "professors_id", referencedColumnName = "id"))
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "disciplina")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Atividade> atividades = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return codigo;
    }

    public Disciplina codigo(Long codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Disciplina descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public Disciplina professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public Disciplina addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.getDisciplinas().add(this);
        return this;
    }

    public Disciplina removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.getDisciplinas().remove(this);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
    }

    public Set<Atividade> getAtividades() {
        return atividades;
    }

    public Disciplina atividades(Set<Atividade> atividades) {
        this.atividades = atividades;
        return this;
    }

    public Disciplina addAtividade(Atividade atividade) {
        this.atividades.add(atividade);
        atividade.setDisciplina(this);
        return this;
    }

    public Disciplina removeAtividade(Atividade atividade) {
        this.atividades.remove(atividade);
        atividade.setDisciplina(null);
        return this;
    }

    public void setAtividades(Set<Atividade> atividades) {
        this.atividades = atividades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Disciplina disciplina = (Disciplina) o;
        if (disciplina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), disciplina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Disciplina{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
