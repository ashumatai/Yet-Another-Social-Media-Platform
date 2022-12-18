function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

$(document).ready(function() {
  // $( "#followerBtn" ).click(function(e) {
  //   e.preventDefault();
  //   var requestConfig = {
  //       method: 'GET',
  //       url: '/followers',
  //       contentType: 'application/json',
  //     };

  //     $.ajax(requestConfig).then(function (responseMessage) {
  //       $('.modal-body').empty();
  //       for (const data of responseMessage) {
  //           $(".modal-body").append(`<p>${data.userName}</p>`);
  //       }
  //     });
  // });
  // $("#signup-btn").click
  // $("DOBInput").change(function () {

  // });

  $("#signup-form").submit(function (e) {
    // Firstname validation
    var firstname = $("#firstnameInput").val();
    if (!firstname || typeof firstname !== "string" || typeof firstname === "undefined" || firstname.trim().length === 0) {
      $("#error-div").text("Missing Firstname");
    }
    let format = /[`0123456789!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
    if (firstname.length < 3 || format.test(firstname)) {
      $("#error-div").text("Firstname must be atleast 3 characters long and should not contain special characters or numbers");
    }

    // Lastname validation
    var lastname = $("#firstnameInput").val();
    if (!lastname || typeof lastname !== "string" || typeof lastname === "undefined" || lastname.trim().length === 0) {
      $("#error-div").text("Missing Firstname");
    }
    if (lastname.length < 3 || format.test(lastname)) {
      $("#error-div").text("Firstname must be atleast 3 characters long and should not contain special characters or numbers");
    }

    // Username validation
    var username = $("#usernameInput").val();
    const usernameRegex = /^[a-z0-9]{4,}$/i;
    if (!username || typeof username != "string" || username.trim().length === 0) {
      $("#error-div").text("Missing Username");
    } else if (!usernameRegex.test(username)) {
      $("#error-div").text("Invalid Username: The username must be only alphanumeric and have atleast 4 characters");
    };

    // Email validation
    var email = $("#emailInput").val();
    const emailFormat =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
    if (!email || typeof email != "string" || email.trim().length === 0) {
      $("#error-div").text("Missing Email");
    } else if (!emailFormat.test(email.trim())) {
      $("#error-div").text("Invalid Email");
    }

    // Password validation
    var password = $("#passwordInput").val().trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/;
    if (!password || typeof password != "string" || password.trim().length === 0) {
      $("#error-div").text("Missing Password");
    } else if (!passwordRegex.test(password)) {
      $("#error-div").text("Invalid Password: The password must contain atleast 1 uppercase character, 1 lowercase character, 1 number, 1 special character and be atleast 8 characters long");
    }

    // Date validation
    var dob = $("#DOBInput").val().trim();
    var today = new Date();
    var birthDate = new Date(dob);
    if (!dob ||!birthDate || !(birthDate instanceof Date)) {
      $("#error-div").text("Invalid Date");
    }
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 13) {
      $("#error-div").text("You must be atleast 13 years old to register!");
    }
  })

  $("#login-form").submit(function(e) {})

})