import { ElementRef, OnDestroy, EventEmitter, AfterContentInit, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class TabPanel implements AfterContentInit, OnDestroy {
    viewContainer: ViewContainerRef;
    cd: ChangeDetectorRef;
    header: string;
    disabled: boolean;
    closable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    leftIcon: string;
    rightIcon: string;
    cache: boolean;
    tooltip: any;
    tooltipPosition: string;
    tooltipPositionStyle: string;
    tooltipStyleClass: string;
    templates: QueryList<any>;
    constructor(viewContainer: ViewContainerRef, cd: ChangeDetectorRef);
    closed: boolean;
    view: EmbeddedViewRef<any>;
    _selected: boolean;
    loaded: boolean;
    id: string;
    contentTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
    get selected(): boolean;
    set selected(val: boolean);
    ngOnDestroy(): void;
}
export declare class TabView implements AfterContentInit, AfterViewChecked, BlockableUI {
    el: ElementRef;
    cd: ChangeDetectorRef;
    orientation: string;
    style: any;
    styleClass: string;
    controlClose: boolean;
    navbar: ElementRef;
    inkbar: ElementRef;
    tabPanels: QueryList<TabPanel>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    activeIndexChange: EventEmitter<number>;
    initialized: boolean;
    tabs: TabPanel[];
    _activeIndex: number;
    preventActiveIndexPropagation: boolean;
    tabChanged: boolean;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    initTabs(): void;
    open(event: Event, tab: TabPanel): void;
    close(event: Event, tab: TabPanel): void;
    closeTab(tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getBlockableElement(): HTMLElement;
    get activeIndex(): number;
    set activeIndex(val: number);
    updateInkBar(): void;
}
export declare class TabViewModule {
}
