import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INota } from 'app/shared/model/nota.model';
import { NotaService } from './nota.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno';

@Component({
    selector: 'jhi-nota-update',
    templateUrl: './nota-update.component.html'
})
export class NotaUpdateComponent implements OnInit {
    nota: INota;
    isSaving: boolean;

    alunos: IAluno[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected notaService: NotaService,
        protected alunoService: AlunoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nota }) => {
            this.nota = nota;
        });
        this.alunoService.query().subscribe(
            (res: HttpResponse<IAluno[]>) => {
                this.alunos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nota.id !== undefined) {
            this.subscribeToSaveResponse(this.notaService.update(this.nota));
        } else {
            this.subscribeToSaveResponse(this.notaService.create(this.nota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INota>>) {
        result.subscribe((res: HttpResponse<INota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAlunoById(index: number, item: IAluno) {
        return item.id;
    }
}
