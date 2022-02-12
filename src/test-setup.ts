import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom/extend-expect';
import { JestMockExtended } from 'jest-mock-extended';

// for fixing RXJS mocks, see https://github.com/marchaos/jest-mock-extended/issues/51
JestMockExtended.configure({ ignoreProps: ['schedule '] });
