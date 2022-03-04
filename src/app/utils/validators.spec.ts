import { FormControl } from '@angular/forms';

import { validateSearch } from './validators';

describe('validateSearch', () => {
  it('should report invalid for an empty value', () => {
    expect(validateSearch(<FormControl>{ value: '' })).toEqual({ actual: 0, required: 3, tooSmall: true });
  });

  it('should report invalid for a 2 character value', () => {
    expect(validateSearch(<FormControl>{ value: 'fo' })).toEqual({ actual: 2, required: 3, tooSmall: true });
  });

  it('should report valid for a 3 character value', () => {
    expect(validateSearch(<FormControl>{ value: 'foo' })).toBeNull();
  });

  it('should report valid for a 6 character value', () => {
    expect(validateSearch(<FormControl>{ value: 'foobar' })).toBeNull();
  });

  it('should report valid for a 8 character value', () => {
    expect(validateSearch(<FormControl>{ value: 'testtest' })).toBeNull();
  });

  it('should report invalid for a 9 character value', () => {
    expect(validateSearch(<FormControl>{ value: 'foobarbaz' })).toEqual({ actual: 9, required: 8, tooLarge: true });
  });

  it('should report invalid for a very long character value', () => {
    expect(validateSearch(<FormControl>{ value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr' })).toEqual({
      actual: 55,
      required: 8,
      tooLarge: true,
    });
  });
});
