import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDisciplina } from 'app/shared/model/disciplina.model';
import { DisciplinaService } from './disciplina.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor';

@Component({
    selector: 'jhi-disciplina-update',
    templateUrl: './disciplina-update.component.html'
})
export class DisciplinaUpdateComponent implements OnInit {
    disciplina: IDisciplina;
    isSaving: boolean;

    professors: IProfessor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected disciplinaService: DisciplinaService,
        protected professorService: ProfessorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ disciplina }) => {
            this.disciplina = disciplina;
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
        if (this.disciplina.id !== undefined) {
            this.subscribeToSaveResponse(this.disciplinaService.update(this.disciplina));
        } else {
            this.subscribeToSaveResponse(this.disciplinaService.create(this.disciplina));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisciplina>>) {
        result.subscribe((res: HttpResponse<IDisciplina>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
