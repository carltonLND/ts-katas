import { isPalindrome } from "./palindrome";

test("Is a palindrome - odd length", () => {
  expect(isPalindrome("racecar")).toBe(true);
});

test("Is a palindrome - even length", () => {
  expect(isPalindrome("poop")).toBe(true);
});

test("Is a palindrome - 1 letter", () => {
  expect(isPalindrome("a")).toBe(true);
});

test("Is a palindrome - empty str", () => {
  expect(isPalindrome("")).toBe(true);
});
