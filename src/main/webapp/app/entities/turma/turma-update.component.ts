import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor';

@Component({
    selector: 'jhi-turma-update',
    templateUrl: './turma-update.component.html'
})
export class TurmaUpdateComponent implements OnInit {
    turma: ITurma;
    isSaving: boolean;

    professors: IProfessor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected turmaService: TurmaService,
        protected professorService: ProfessorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ turma }) => {
            this.turma = turma;
        });
        this.professorService.query().subscribe(
            (res: HttpResponse<IProfessor[]>) => {
                this.professors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.turma.id !== undefined) {
            this.subscribeToSaveResponse(this.turmaService.update(this.turma));
        } else {
            this.subscribeToSaveResponse(this.turmaService.create(this.turma));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurma>>) {
        result.subscribe((res: HttpResponse<ITurma>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
