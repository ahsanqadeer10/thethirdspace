export const showErrors = errors => {
  for (const field in errors) {
    var errorMessage = document.createElement("div");
    errorMessage.classList.add("invalid-feedback");
    errorMessage.innerHTML = errors[field];
    var element = document.getElementsByName(field)[0];
    element.classList.add("is-invalid");
    element.parentNode.insertBefore(errorMessage, element.nextSibling);
  }
};

export const clearErrors = errors => {
  for (const field in errors) {
    var element = document.getElementsByName(field)[0];
    element.classList.remove("is-invalid");
  }

  var errorMessages = document.getElementsByClassName("invalid-feedback");
  while (errorMessages[0]) {
    errorMessages[0].parentNode.removeChild(errorMessages[0]);
  }
};

export const displayValidationErrors = errors => {
  for (const field in errors) {
    var errorMessage = document.createElement("div");
    errorMessage.classList.add("invalid-feedback");
    errorMessage.innerHTML = errors[field];
    var element = document.getElementsByName(field)[0];
    element.classList.add("is-invalid");
    element.parentNode.insertBefore(errorMessage, element.nextSibling);
  }
};

export const clearValidationErrors = errors => {
  for (const field in errors) {
    var element = document.getElementsByName(field)[0];
    element.classList.remove("is-invalid");
  }

  var errorMessages = document.getElementsByClassName("invalid-feedback");
  while (errorMessages[0]) {
    errorMessages[0].parentNode.removeChild(errorMessages[0]);
  }
};

export const clearResponseErrors = error => {
  var element = document.getElementsByClassName("alert")[0];
  if (element) {
    element.parentNode.removeChild(element);
  }
};

export const displayResponseErrors = error => {
  switch (error.response.status) {
    case 400:
    case 500:
      var alert = document.createElement("div");
      alert.classList.add("alert", "alert-danger");
      alert.setAttribute("role", "alert");
      var message = document.createTextNode(error.response.data);
      alert.appendChild(message);
      var element = document.querySelector("#main");
      element.insertBefore(alert, element.firstChild);

      break;

    default:
      break;
  }
};
