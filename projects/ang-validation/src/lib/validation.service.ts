import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  private errors: WritableSignal<{ [key: string]: string[] }> = signal({});

  constructor() {}

  addError(field: string, message: string): void {
    this.errors.update((errors) => ({
      ...errors,
      [field]: [...(errors[field] || []), message],
    }));
  }

  clearErrors(field: string): void {
    this.errors.update((errors) => {
      const { [field]: _, ...rest } = errors;
      return rest;
    });
  }

  validateField(field: string, value: string, rules: string[]): void {
    this.clearErrors(field);

    rules.forEach((rule) => {
      const [ruleName, ruleValue] = rule.split(":");

      switch (ruleName) {
        case "required":
          if (!value.trim()) this.addError(field, `${field} cannot be empty`);
          break;
        case "min":
          if (value.length < Number(ruleValue))
            this.addError(
              field,
              `${field} must have at least ${ruleValue} characters`
            );
          break;
        case "max":
          if (value.length > Number(ruleValue))
            this.addError(
              field,
              `${field} must have at most ${ruleValue} characters`
            );
          break;
      }
    });
  }

  getErrors(field: string): string[] {
    return this.errors()[field] || [];
  }

  isFormValid(): boolean {
    return Object.keys(this.errors()).length === 0;
  }
}
