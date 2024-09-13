const{getradya}= require("../scripts/getradya")
const now = new Date();

test('give me the remaining days from now the date i will set the parameter', () => {
  expect(getradya(now)).toBe(0);
});
