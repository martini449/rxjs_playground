import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableMapDemoComponent } from './observable-map-demo.component';

describe('ProfileEditorComponent', () => {
  let component: ObservableMapDemoComponent;
  let fixture: ComponentFixture<ObservableMapDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableMapDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
