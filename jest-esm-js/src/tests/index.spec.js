import { foo } from "../index";

describe("suite", () => {
  test("test", async () => {
    const code = await foo();
    expect(code).toBe(200);
  });
});
