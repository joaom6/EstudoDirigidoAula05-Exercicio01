import { IPessoa } from 'app/shared/model//pessoa.model';
import { ITurma } from 'app/shared/model//turma.model';
import { IAtividade } from 'app/shared/model//atividade.model';
import { IDisciplina } from 'app/shared/model//disciplina.model';

export interface IProfessor {
    id?: number;
    codigo?: number;
    descricao?: string;
    pessoa?: IPessoa;
    turmas?: ITurma[];
    atividades?: IAtividade[];
    disciplinas?: IDisciplina[];
}

export class Professor implements IProfessor {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public pessoa?: IPessoa,
        public turmas?: ITurma[],
        public atividades?: IAtividade[],
        public disciplinas?: IDisciplina[]
    ) {}
}
