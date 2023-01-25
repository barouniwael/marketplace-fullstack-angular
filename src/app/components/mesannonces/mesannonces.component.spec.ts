import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesannoncesComponent } from './mesannonces.component';

describe('MesannoncesComponent', () => {
  let component: MesannoncesComponent;
  let fixture: ComponentFixture<MesannoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesannoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesannoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
