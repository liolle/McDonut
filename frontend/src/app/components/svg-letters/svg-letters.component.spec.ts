import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLettersComponent } from './svg-letters.component';

describe('SvgLettersComponent', () => {
  let component: SvgLettersComponent;
  let fixture: ComponentFixture<SvgLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
