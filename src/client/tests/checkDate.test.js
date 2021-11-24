import { dateCheck } from '../js/dateCheck';

test('Test Dates validity', () => {
  expect(dateCheck("11/24/2021","11/27/2021")).toBe(3);
})