import { IAluno } from 'app/shared/model//aluno.model';
import { IAtividade } from 'app/shared/model//atividade.model';

export interface INota {
    id?: number;
    codigo?: number;
    descricao?: string;
    aluno?: IAluno;
    atividades?: IAtividade[];
}

export class Nota implements INota {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public aluno?: IAluno,
        public atividades?: IAtividade[]
    ) {}
}
