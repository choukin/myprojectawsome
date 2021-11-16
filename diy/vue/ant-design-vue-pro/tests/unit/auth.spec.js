import {check} from '@/utils/auth'

describe("auth", () => {
  it("empty auth", () => {
    expect(check(['user'])).toEqual(true)
    expect(check(['admin'])).toEqual(true)
  });
});
