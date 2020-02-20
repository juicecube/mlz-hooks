import { renderHook } from '@testing-library/react-hooks';
import { useEvent } from '../src';

describe('useEvent', () => {
  it('should be defined', () => {
    expect(useEvent).toBeDefined();
  });
});
