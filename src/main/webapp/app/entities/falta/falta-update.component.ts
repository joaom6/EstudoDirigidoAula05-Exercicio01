import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFalta } from 'app/shared/model/falta.model';
import { FaltaService } from './falta.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno';
import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from 'app/entities/periodo-letivo';

@Component({
    selector: 'jhi-falta-update',
    templateUrl: './falta-update.component.html'
})
export class FaltaUpdateComponent implements OnInit {
    falta: IFalta;
    isSaving: boolean;

    alunos: IAluno[];

    periodoletivos: IPeriodoLetivo[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected faltaService: FaltaService,
        protected alunoService: AlunoService,
        protected periodoLetivoService: PeriodoLetivoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ falta }) => {
            this.falta = falta;
        });
        this.alunoService.query().subscribe(
            (res: HttpResponse<IAluno[]>) => {
                this.alunos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.periodoLetivoService.query().subscribe(
            (res: HttpResponse<IPeriodoLetivo[]>) => {
                this.periodoletivos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.falta.id !== undefined) {
            this.subscribeToSaveResponse(this.faltaService.update(this.falta));
        } else {
            this.subscribeToSaveResponse(this.faltaService.create(this.falta));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFalta>>) {
        result.subscribe((res: HttpResponse<IFalta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPeriodoLetivoById(index: number, item: IPeriodoLetivo) {
        return item.id;
    }
}
