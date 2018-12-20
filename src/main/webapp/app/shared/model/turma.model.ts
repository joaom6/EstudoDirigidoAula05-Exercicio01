import { IProfessor } from 'app/shared/model//professor.model';
import { IAluno } from 'app/shared/model//aluno.model';
import { IAula } from 'app/shared/model//aula.model';

export interface ITurma {
    id?: number;
    codigo?: number;
    descricao?: string;
    professor?: IProfessor;
    alunos?: IAluno[];
    aulas?: IAula[];
}

export class Turma implements ITurma {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public professor?: IProfessor,
        public alunos?: IAluno[],
        public aulas?: IAula[]
    ) {}
}
