import { ScreenCheckedPipe } from './screen-checked.pipe';

describe('ScreenCheckedPipe', () => {
  it('should display X if value is false', () => {
    const pipe = new ScreenCheckedPipe();

    expect(pipe.transform(false)).toEqual('X');
  });

  it('should display ✓ if value is true', () => {
    const pipe = new ScreenCheckedPipe();

    expect(pipe.transform(true)).toEqual('✓');
  });
});