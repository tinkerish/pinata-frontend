export function validateEmail(email: string): string {
  if (email.length === 0) return "Email is required";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) return "Invalid email";
  return "";
}
export function validatePassword(password: string): string {
  if (password.length === 0) return "Password is required";
  if (password.length < 5) return "Password must be at least 6 characters";
  return "";
}
