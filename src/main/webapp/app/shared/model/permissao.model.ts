import { IUsuario } from 'app/shared/model//usuario.model';

export interface IPermissao {
    id?: number;
    codigo?: number;
    descricao?: string;
    usuarios?: IUsuario[];
}

export class Permissao implements IPermissao {
    constructor(public id?: number, public codigo?: number, public descricao?: string, public usuarios?: IUsuario[]) {}
}
