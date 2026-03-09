export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return !!password && password.length >= 6;
};

export const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateUserInput = (name: string, email: string, password: string) => {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!isValidEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!isValidPassword(password)) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};