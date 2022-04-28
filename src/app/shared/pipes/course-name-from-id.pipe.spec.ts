import { CourseNameFromIDPipe } from './course-name-from-id.pipe';

describe('CourseNameFromIDPipe', () => {
  it('create an instance', () => {
    const pipe = new CourseNameFromIDPipe();
    expect(pipe).toBeTruthy();
  });
});
