import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'gmp-vc-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('component', { read: ViewContainerRef }) container!: ViewContainerRef;

    @Input() public component!: any;
    @Input() public componentProps!: any;

    constructor(
        private resolver: ComponentFactoryResolver,
    ) { }

    public ngOnInit(): void {
        console.log('--> common ModalComponent ngOnInit');
    }

    public ngAfterViewInit(): void {
        // create modal component
        setTimeout(() => {
            const component = this.resolver.resolveComponentFactory(this.component);
            const componentInstance = this.container.createComponent(component);
            Object.assign(componentInstance.instance, this.componentProps)
        }, 0);
    }

    public ngOnDestroy(): void {
        console.log('--> common ModalComponent ngOnDestroy');
    }
}
