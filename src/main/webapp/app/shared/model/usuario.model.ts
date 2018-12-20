import { IPessoa } from 'app/shared/model//pessoa.model';
import { IPermissao } from 'app/shared/model//permissao.model';

export interface IUsuario {
    id?: number;
    codigo?: number;
    descricao?: string;
    pessoa?: IPessoa;
    permissao?: IPermissao;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public codigo?: number,
        public descricao?: string,
        public pessoa?: IPessoa,
        public permissao?: IPermissao
    ) {}
}
