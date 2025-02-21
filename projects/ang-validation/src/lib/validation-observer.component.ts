import { Component, Signal, computed, signal } from '@angular/core';
import { ValidationService } from './validation.service';

@Component({
  selector: 's3-validation-observer',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class ValidationObserverComponent {
  valid: Signal<boolean> = computed(() =>
    this.validationService.isFormValid()
  );

  constructor(private validationService: ValidationService) {}
}
