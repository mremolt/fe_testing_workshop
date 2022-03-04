import { ValidatorFn, AbstractControl } from '@angular/forms';

export const validateSearch: ValidatorFn = (control: AbstractControl) => {
  const value = String(control.value);

  if (value.length < 3) {
    return { tooSmall: true, actual: value.length, required: 3 };
  }

  if (value.length > 8) {
    return { tooLarge: true, actual: value.length, required: 8 };
  }

  return null;
};
