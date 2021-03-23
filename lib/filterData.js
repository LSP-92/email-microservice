const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (arg) => {
  console.log(arg, 'antes del filter')
  
  if (!arg.templateId) {
    return 2;
  }
  if (!validateEmail.test(arg.to)) {
    return 2;
  }
  return 0
};
