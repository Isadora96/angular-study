import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false;
    //my solution
	// constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        
    }

    // @HostListener('click') mouseclick(eventData: Event) {
    //     this.elementRef.nativeElement.className.includes('open') ?
    //     this.renderer.removeClass(this.elementRef.nativeElement, 'open') :
    //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // }

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}