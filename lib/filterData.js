const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (arg) => {
  if (!arg.template_id || "") {
    return 2;
  }
  if (!validateEmail.test(arg.to)) {
    return 2;
  }
  if (!validateEmail.test(arg.from)) {
    return 1;
  }
  return 0
};
