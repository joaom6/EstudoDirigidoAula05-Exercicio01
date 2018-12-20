import { ITurma } from 'app/shared/model//turma.model';
import { IPeriodoLetivo } from 'app/shared/model//periodo-letivo.model';

export interface IAula {
    id?: number;
    codigo?: number;
    descricao?: string;
    turma?: ITurma;
    periodoLetivo?: IPeriodoLetivo;
}

export class Aula implements IAula {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public turma?: ITurma,
        public periodoLetivo?: IPeriodoLetivo
    ) {}
}
