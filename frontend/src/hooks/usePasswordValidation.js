export default function usePasswordValidation() {
  const validate = (pwd) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(pwd) &&
      hasUpper.test(pwd) &&
      hasLower.test(pwd) &&
      hasNumber.test(pwd) &&
      hasSpecial.test(pwd)
    );
  };

  const getMessage = () =>
    "❌ Sua senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caracter especial.";

  return { validate, getMessage };
}
