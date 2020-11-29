import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    Renderer2,
    RendererFactory2,
} from '@angular/core';
import { ModalComponent } from '@gmp-vc-components/modal/modal.component';
import { Subject } from 'rxjs';
import { IModal } from '../models/modal.models';


@Injectable({
    providedIn: 'root',
})
export class ModalService {
    /** Ref to window document */
    private readonly document: Document;
    /** Renderer instance */
    private readonly renderer: Renderer2;
    /** Attached component */
    private componentRef!: ComponentRef<any>;

    private result!: Subject<any>;

    constructor(
        @Inject(DOCUMENT) document: Document,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef,
        private rendererFactory: RendererFactory2,
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.document = document;
    }

    open(component: any, componentProps = {}): IModal {
        // create modal background component
        const modalBackgroundRef = this.componentFactoryResolver
            .resolveComponentFactory(ModalComponent)
            .create(this.injector);

        // put inside the angular component tree
        this.applicationRef.attachView(modalBackgroundRef.hostView);
        const componentRootNode = (modalBackgroundRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

        // append component to the body
        this.renderer.appendChild(this.document.body, componentRootNode);
        this.componentRef = modalBackgroundRef;

        this.result = new Subject();

        this.componentRef.instance.component = component;
        this.componentRef.instance.componentProps = componentProps;

        return {
            // componentInstance: modalBackgroundRef.instance,
            result: this.result,
        };
    }

    /** Closes the modal with an optional `result` value.
     *
     * The `IModal.result` observable will emit the provided value to subsribers
     */
    public close(result?: any): void {
        this.result.next(result);
        this.removeComponent();
    }

    /**
     * Dismisses the modal.
     *
     * The `IModal.result` observable will be completed.
     */
    public dismiss(): void {
        this.result.complete();
        this.removeComponent();
    }

    /**
     * Destroys component.
     */
    private removeComponent(): void {
        this.applicationRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
    }
}
