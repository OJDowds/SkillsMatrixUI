import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent, Observable, Subscription, merge } from 'rxjs';
import { IUserSkill } from 'src/interfaces/userSkill';
import { SkillsService } from 'src/skills.service';
import { GenericValidator } from '../validators/generic-validator';



@Component({
  templateUrl: './skills-edit.component.html',
})
export class SkillEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  pageTitle = 'Skill Edit';
  errorMessage!: '';
  skillForm!: FormGroup;

  IuserSkill!: IUserSkill;
  private sub!: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private skillsService: SkillsService) {


this.validationMessages = {
skillName: {
required: 'Skill name is required.',
minlength: 'Skill name must be at least three characters.',
maxlength: 'Skill name cannot exceed 50 characters.'
},


};

this.genericValidator = new GenericValidator(this.validationMessages);
}

  ngOnInit(): void {

    this.skillForm = new FormGroup({
  experienceLevel: new FormControl(null, [
    Validators.required,
    Validators.min(1),
    Validators.max(10)
  ])
});


this.sub = this.route.paramMap.subscribe(
  params => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserSkill(id);
  }
);
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

ngAfterViewInit(): void {
  const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));


  merge(this.skillForm.valueChanges, ...controlBlurs).pipe(
    debounceTime(800)
  ).subscribe(value => {
    this.displayMessage = this.genericValidator.processMessages(this.skillForm);
  });
}

// addTag(): void {
//   this.tags.push(new FormControl());
// }

// deleteTag(index: number): void {
//   this.tags.removeAt(index);
//   this.tags.markAsDirty();
// }

getUserSkill(id: number): void {
  this.skillsService.getUserSkill(id)
    .subscribe({
      next: (userSkill: IUserSkill) => this.displayUserSkill(userSkill),
      error: err => this.errorMessage = err
    });
}

displayUserSkill(userSkill: IUserSkill): void {
  if (this.skillForm) {
    this.skillForm.reset();
  }
  this.IuserSkill = userSkill;

  if (this.IuserSkill.id === 0) {
    this.pageTitle = 'Add Skill';
  } else {
    this.pageTitle = `Edit Skill: ${this.IuserSkill.skill.skillName}`;
  }


  this.skillForm.patchValue({
    skillLevel: this.IuserSkill.experienceLevel
  });
}

deleteSkill(): void {
  if (this.IuserSkill.id === 0) {
    this.onSaveComplete();
  } else {
    if (confirm(`Delete the skill: ${this.IuserSkill.skill.skillName}?`)) {
      this.skillsService.deleteUserSkill(this.IuserSkill.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }
  }
}

saveUserSkill(): void {
  if (this.skillForm.valid) {
    if (this.skillForm.dirty) {
      const s = { ...this.IuserSkill, ...this.skillForm.value };

      if (s.id === 0) {
        this.skillsService.createUserSkill(s)
        .subscribe({
          next: x => {
            console.log(x);
            return this.onSaveComplete();
          },
          error: err => this.errorMessage = err
        });
      } else {
        this.skillsService.updateUserSkill(s)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      this.onSaveComplete();
    }
  } 
  
  else 
  {
    this.errorMessage = this.errorMessage;
  }
}

onSaveComplete(): void {
  this.skillForm.reset();
  this.router.navigate(['/skills']);
}
}
