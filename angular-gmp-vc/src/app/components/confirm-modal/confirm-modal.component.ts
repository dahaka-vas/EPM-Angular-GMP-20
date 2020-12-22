import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'gmp-vc-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
    public course = '';

    constructor(
        private modalService: ModalService,
    ) { }

    public ngOnInit(): void {
        console.log('ConfirmModalComponent ngOnInit');
    }

    public confirm(): void {
        this.modalService.close(true);
    }

    public dismiss(): void {
        this.modalService.dismiss();
    }

    public ngOnDestroy(): void {
        console.log('ConfirmModalComponent ngOnDestroy');
    }
}
