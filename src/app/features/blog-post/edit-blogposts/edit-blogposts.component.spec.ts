import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogpostsComponent } from './edit-blogposts.component';

describe('EditBlogpostsComponent', () => {
  let component: EditBlogpostsComponent;
  let fixture: ComponentFixture<EditBlogpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlogpostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlogpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
