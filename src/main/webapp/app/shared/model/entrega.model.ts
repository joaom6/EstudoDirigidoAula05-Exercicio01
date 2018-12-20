import { IAluno } from 'app/shared/model//aluno.model';
import { IAtividade } from 'app/shared/model//atividade.model';

export interface IEntrega {
    id?: number;
    codigo?: number;
    descricao?: string;
    aluno?: IAluno;
    alunos?: IAluno[];
    atividades?: IAtividade[];
}

export class Entrega implements IEntrega {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public aluno?: IAluno,
        public alunos?: IAluno[],
        public atividades?: IAtividade[]
    ) {}
}
