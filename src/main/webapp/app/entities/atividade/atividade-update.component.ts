import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from './atividade.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor';
import { IDisciplina } from 'app/shared/model/disciplina.model';
import { DisciplinaService } from 'app/entities/disciplina';
import { INota } from 'app/shared/model/nota.model';
import { NotaService } from 'app/entities/nota';
import { IEntrega } from 'app/shared/model/entrega.model';
import { EntregaService } from 'app/entities/entrega';

@Component({
    selector: 'jhi-atividade-update',
    templateUrl: './atividade-update.component.html'
})
export class AtividadeUpdateComponent implements OnInit {
    atividade: IAtividade;
    isSaving: boolean;

    professors: IProfessor[];

    disciplinas: IDisciplina[];

    notas: INota[];

    entregas: IEntrega[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected atividadeService: AtividadeService,
        protected professorService: ProfessorService,
        protected disciplinaService: DisciplinaService,
        protected notaService: NotaService,
        protected entregaService: EntregaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ atividade }) => {
            this.atividade = atividade;
        });
        this.professorService.query().subscribe(
            (res: HttpResponse<IProfessor[]>) => {
                this.professors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.disciplinaService.query().subscribe(
            (res: HttpResponse<IDisciplina[]>) => {
                this.disciplinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.notaService.query().subscribe(
            (res: HttpResponse<INota[]>) => {
                this.notas = res.body;
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
        if (this.atividade.id !== undefined) {
            this.subscribeToSaveResponse(this.atividadeService.update(this.atividade));
        } else {
            this.subscribeToSaveResponse(this.atividadeService.create(this.atividade));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtividade>>) {
        result.subscribe((res: HttpResponse<IAtividade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfessorById(index: number, item: IProfessor) {
        return item.id;
    }

    trackDisciplinaById(index: number, item: IDisciplina) {
        return item.id;
    }

    trackNotaById(index: number, item: INota) {
        return item.id;
    }

    trackEntregaById(index: number, item: IEntrega) {
        return item.id;
    }
}
