const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// const closeBtn = document.querySelector(".close-btn");
// const alert = document.querySelector(".alert");
// closeBtn.addEventListener("click", function () {
	
// 	alert.classList.remove("show");
// 	alert.classList.add("hide");
	
// });

$(document).ready(function () {
  $("#input-b6a").fileinput({
      showUpload: false,
      dropZoneEnabled: false,
      maxFileCount: 10,
      inputGroupClass: "input-group-lg"
  });
  $("#input-b6b").fileinput({
      showUpload: false,
      dropZoneEnabled: false,
      maxFileCount: 10,
      inputGroupClass: "input-group-sm"
  });
});

