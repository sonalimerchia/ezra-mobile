const emailRegex = /^[A-Za-z0-9]*@[A-Za-z0-9]*\.[A-Za-z0-9]/;

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length > 6;
};
