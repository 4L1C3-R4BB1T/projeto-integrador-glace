import { ElementRef, OnDestroy, DoCheck, NgZone } from '@angular/core';
export declare class Password implements OnDestroy, DoCheck {
    el: ElementRef;
    zone: NgZone;
    promptLabel: string;
    weakLabel: string;
    mediumLabel: string;
    strongLabel: string;
    feedback: boolean;
    set showPassword(show: boolean);
    panel: HTMLDivElement;
    meter: any;
    info: any;
    filled: boolean;
    constructor(el: ElementRef, zone: NgZone);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    createPanel(): void;
    onFocus(): void;
    onBlur(): void;
    onKeyup(e: any): void;
    testStrength(str: string): number;
    normalize(x: any, y: any): number;
    get disabled(): boolean;
    ngOnDestroy(): void;
}
export declare class PasswordModule {
}
