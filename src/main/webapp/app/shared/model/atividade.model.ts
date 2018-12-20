import { IProfessor } from 'app/shared/model//professor.model';
import { IDisciplina } from 'app/shared/model//disciplina.model';
import { INota } from 'app/shared/model//nota.model';
import { IEntrega } from 'app/shared/model//entrega.model';

export interface IAtividade {
    id?: number;
    codigo?: number;
    descricao?: string;
    professor?: IProfessor;
    disciplina?: IDisciplina;
    nota?: INota;
    entrega?: IEntrega;
}

export class Atividade implements IAtividade {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public professor?: IProfessor,
        public disciplina?: IDisciplina,
        public nota?: INota,
        public entrega?: IEntrega
    ) {}
}
