import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from './aluno.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma';
import { IEntrega } from 'app/shared/model/entrega.model';
import { EntregaService } from 'app/entities/entrega';

@Component({
    selector: 'jhi-aluno-update',
    templateUrl: './aluno-update.component.html'
})
export class AlunoUpdateComponent implements OnInit {
    aluno: IAluno;
    isSaving: boolean;

    pessoas: IPessoa[];

    turmas: ITurma[];

    entregas: IEntrega[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected alunoService: AlunoService,
        protected pessoaService: PessoaService,
        protected turmaService: TurmaService,
        protected entregaService: EntregaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aluno }) => {
            this.aluno = aluno;
        });
        this.pessoaService.query({ filter: 'aluno-is-null' }).subscribe(
            (res: HttpResponse<IPessoa[]>) => {
                if (!this.aluno.pessoa || !this.aluno.pessoa.id) {
                    this.pessoas = res.body;
                } else {
                    this.pessoaService.find(this.aluno.pessoa.id).subscribe(
                        (subRes: HttpResponse<IPessoa>) => {
                            this.pessoas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.turmaService.query().subscribe(
            (res: HttpResponse<ITurma[]>) => {
                this.turmas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.entregaService.query().subscribe(
            (res: HttpResponse<IEntrega[]>) => {
                this.entregas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.aluno.id !== undefined) {
            this.subscribeToSaveResponse(this.alunoService.update(this.aluno));
        } else {
            this.subscribeToSaveResponse(this.alunoService.create(this.aluno));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAluno>>) {
        result.subscribe((res: HttpResponse<IAluno>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPessoaById(index: number, item: IPessoa) {
        return item.id;
    }

    trackTurmaById(index: number, item: ITurma) {
        return item.id;
    }

    trackEntregaById(index: number, item: IEntrega) {
        return item.id;
    }
}
