import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo-update',
    templateUrl: './periodo-letivo-update.component.html'
})
export class PeriodoLetivoUpdateComponent implements OnInit {
    periodoLetivo: IPeriodoLetivo;
    isSaving: boolean;

    constructor(protected periodoLetivoService: PeriodoLetivoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ periodoLetivo }) => {
            this.periodoLetivo = periodoLetivo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.periodoLetivo.id !== undefined) {
            this.subscribeToSaveResponse(this.periodoLetivoService.update(this.periodoLetivo));
        } else {
            this.subscribeToSaveResponse(this.periodoLetivoService.create(this.periodoLetivo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodoLetivo>>) {
        result.subscribe((res: HttpResponse<IPeriodoLetivo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
