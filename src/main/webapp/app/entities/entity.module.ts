import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogPermissaoModule } from './permissao/permissao.module';
import { BlogUsuarioModule } from './usuario/usuario.module';
import { BlogPessoaModule } from './pessoa/pessoa.module';
import { BlogAlunoModule } from './aluno/aluno.module';
import { BlogProfessorModule } from './professor/professor.module';
import { BlogFaltaModule } from './falta/falta.module';
import { BlogNotaModule } from './nota/nota.module';
import { BlogTurmaModule } from './turma/turma.module';
import { BlogDisciplinaModule } from './disciplina/disciplina.module';
import { BlogAulaModule } from './aula/aula.module';
import { BlogAtividadeModule } from './atividade/atividade.module';
import { BlogEntregaModule } from './entrega/entrega.module';
import { BlogPeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BlogPermissaoModule,
        BlogUsuarioModule,
        BlogPessoaModule,
        BlogAlunoModule,
        BlogProfessorModule,
        BlogFaltaModule,
        BlogNotaModule,
        BlogTurmaModule,
        BlogDisciplinaModule,
        BlogAulaModule,
        BlogAtividadeModule,
        BlogEntregaModule,
        BlogPeriodoLetivoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
