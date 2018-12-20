/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { AulaDeleteDialogComponent } from 'app/entities/aula/aula-delete-dialog.component';
import { AulaService } from 'app/entities/aula/aula.service';

describe('Component Tests', () => {
    describe('Aula Management Delete Component', () => {
        let comp: AulaDeleteDialogComponent;
        let fixture: ComponentFixture<AulaDeleteDialogComponent>;
        let service: AulaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [AulaDeleteDialogComponent]
            })
                .overrideTemplate(AulaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AulaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});