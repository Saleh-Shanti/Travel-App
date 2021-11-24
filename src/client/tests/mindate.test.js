import { minDate } from '../js/minDate';

test('Test Minimum Date validity', () => {
  expect(minDate("11/27/2022")).toBe(false);
})