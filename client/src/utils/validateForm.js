export const validateForm = (data) => {
  const { name, email } = data;

  const error = [];

  if (name.length > 20) error.push("Tên không được quá 20 kí tự!");
  if (!validateEmail(email)) error.push("Email sai định dạng!");

  return error;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
