import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared';
import {
    AlunoComponent,
    AlunoDetailComponent,
    AlunoUpdateComponent,
    AlunoDeletePopupComponent,
    AlunoDeleteDialogComponent,
    alunoRoute,
    alunoPopupRoute
} from './';

const ENTITY_STATES = [...alunoRoute, ...alunoPopupRoute];

@NgModule({
    imports: [BlogSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AlunoComponent, AlunoDetailComponent, AlunoUpdateComponent, AlunoDeleteDialogComponent, AlunoDeletePopupComponent],
    entryComponents: [AlunoComponent, AlunoUpdateComponent, AlunoDeleteDialogComponent, AlunoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogAlunoModule {}
