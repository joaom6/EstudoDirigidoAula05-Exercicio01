import { IAula } from 'app/shared/model//aula.model';
import { IFalta } from 'app/shared/model//falta.model';

export interface IPeriodoLetivo {
    id?: number;
    codigo?: number;
    descricao?: string;
    aulas?: IAula[];
    faltas?: IFalta[];
}

export class PeriodoLetivo implements IPeriodoLetivo {
    constructor(public id?: number, public codigo?: number, public descricao?: string, public aulas?: IAula[], public faltas?: IFalta[]) {}
}
