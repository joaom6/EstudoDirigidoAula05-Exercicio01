import { IPessoa } from 'app/shared/model//pessoa.model';
import { ITurma } from 'app/shared/model//turma.model';
import { IEntrega } from 'app/shared/model//entrega.model';
import { IFalta } from 'app/shared/model//falta.model';
import { INota } from 'app/shared/model//nota.model';

export interface IAluno {
    id?: number;
    codigo?: number;
    descricao?: string;
    pessoa?: IPessoa;
    turma?: ITurma;
    entrega?: IEntrega;
    faltas?: IFalta[];
    notas?: INota[];
    entregas?: IEntrega[];
}

export class Aluno implements IAluno {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public pessoa?: IPessoa,
        public turma?: ITurma,
        public entrega?: IEntrega,
        public faltas?: IFalta[],
        public notas?: INota[],
        public entregas?: IEntrega[]
    ) {}
}
