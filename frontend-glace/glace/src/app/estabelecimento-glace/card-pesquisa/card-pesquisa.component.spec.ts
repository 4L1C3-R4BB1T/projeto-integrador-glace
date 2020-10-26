import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPesquisaComponent } from './card-pesquisa.component';

describe('CardPesquisaComponent', () => {
  let component: CardPesquisaComponent;
  let fixture: ComponentFixture<CardPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
