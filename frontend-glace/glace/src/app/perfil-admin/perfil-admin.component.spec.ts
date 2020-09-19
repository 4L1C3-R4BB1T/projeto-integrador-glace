import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdminComponent } from './perfil-admin.component';

describe('PerfilAdminComponent', () => {
  let component: PerfilAdminComponent;
  let fixture: ComponentFixture<PerfilAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
