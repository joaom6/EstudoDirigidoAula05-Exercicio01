import { IAluno } from 'app/shared/model//aluno.model';
import { IPeriodoLetivo } from 'app/shared/model//periodo-letivo.model';

export interface IFalta {
    id?: number;
    codigo?: number;
    descricao?: string;
    aluno?: IAluno;
    periodoLetivo?: IPeriodoLetivo;
}

export class Falta implements IFalta {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public aluno?: IAluno,
        public periodoLetivo?: IPeriodoLetivo
    ) {}
}
