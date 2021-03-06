import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAtividade } from 'app/shared/model/atividade.model';
import { AccountService } from 'app/core';
import { AtividadeService } from './atividade.service';

@Component({
    selector: 'jhi-atividade',
    templateUrl: './atividade.component.html'
})
export class AtividadeComponent implements OnInit, OnDestroy {
    atividades: IAtividade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected atividadeService: AtividadeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.atividadeService.query().subscribe(
            (res: HttpResponse<IAtividade[]>) => {
                this.atividades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAtividades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAtividade) {
        return item.id;
    }

    registerChangeInAtividades() {
        this.eventSubscriber = this.eventManager.subscribe('atividadeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
