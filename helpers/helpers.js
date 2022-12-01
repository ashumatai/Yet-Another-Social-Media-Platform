const {ObjectId} = require('mongodb');

const validString = function error_handling_for_string(userInput,inputParameter){
    if(!userInput) throw 'Please provide ' + inputParameter;
    if (typeof(userInput) !== 'string' || typeof(userInput) ==='undefined') throw inputParameter +' must be a string';
        if (userInput.trim().length === 0)
          throw inputParameter +' cannot be an empty string or string with just spaces';    
}

const validObjectId = function error_handling_for_id(inputId,inputParameter){
    if (!inputId) throw 'You must provide an ' +inputParameter;
    if (typeof(inputId) !== 'string' || typeof(inputId)==='undefined') throw inputParameter+' must be a string';
    if (inputId.trim().length === 0)
      throw inputParameter+' cannot be an empty string or just spaces';
    
    if (!ObjectId.isValid(inputId.trim())) throw 'Invalid object '+inputParameter;
}
const validName = function error_handling_for_name(inputName,inputParameter){
    if(!inputName) throw 'Please provide ' + inputParameter;
    if (typeof(inputName) !== 'string' || typeof(inputName) ==='undefined') throw inputParameter +' must be a string';
        if (inputName.trim().length === 0)
          throw inputParameter +' cannot be an empty string or string with just spaces';
    const name = inputName.trim().split(' ');
    if(name.length > 1){
        throw inputParameter +' should be in valid format';
      }
    else{
        let format = /[`0123456789!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if (inputName.length < 3 || format.test(inputName)) {
            throw inputParameter +' must be atleast 3 character long and should not contain special characters or numbers';
          }
    }
    
}
const validStatus = function error_handling_for_status(inputStatus,inputParameter){
    if(!inputStatus) throw 'Please provide ' + inputParameter;
    if (typeof(inputStatus) !== 'string' || typeof(inputStatus) ==='undefined') throw inputParameter +' must be a string';
        if (inputStatus.trim().length === 0)
          throw inputParameter +' cannot be an empty string or string with just spaces';
    let statusFormat = ['Accepted','Rejected','Pending'];
    if(!statusFormat.includes(inputStatus.trim())) throw 'Please enter valid '+ inputParameter+' type';
    
}
const validLogin = function error_handling_for_login(inputUsername,inputPassword){
  let format = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let spaces = /(.*\s{1,}.*)|(^\s+.*)|(.*\s+$)/g;
  let password_format = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g;
  inputUsername = inputUsername.trim();
  if (!inputUsername || !inputPassword) throw 'You must provide username and password ';
  if (typeof(inputUsername) !== 'string' || typeof(inputUsername)==='undefined') throw 'Username must be a string';
  if (typeof(inputPassword) !== 'string' || typeof(inputPassword)==='undefined') throw 'Password must be a string';
  if (inputUsername.length < 4) throw 'Username should be at least 4 characters long.';
  // if(spaces.test(inputUsername)) throw 'Username cannot contain spaces';
  if(format.test(inputUsername)) throw 'Please enter valid username .i.e without special characters or spaces';
  if (inputPassword.length < 6) throw 'Password should be at least 6 characters long.';
  if(spaces.test(inputPassword)) throw 'Password cannot contain spaces';
  if(!password_format.test(inputPassword)) throw 'Password should contain at least one uppercase character, at least one number and at least one special character';

}
const validEmail = function error_handling_for_email(inputEmail){
  let emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
  inputEmail = inputEmail.trim();
  if (!inputEmail) throw 'You must provide Email Address ';
  if (typeof(inputEmail) !== 'string' || typeof(inputEmail)==='undefined') throw 'Email Address must be a string';
  if(!emailFormat.test(inputEmail)) throw 'Please enter a valid Email Address';
}
const validPhoneNumber = function error_handling_for_phoneNumber(inputPhoneNumber){
  let mobileFormat = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]\d{3}[\s-]\d{4}$/g;
  inputPhoneNumber = inputPhoneNumber.trim();
  if (!inputPhoneNumber) throw 'You must provide Phone Number ';
  if (typeof(inputPhoneNumber) !== 'string' || typeof(inputPhoneNumber)==='undefined') throw 'Phone Number must be a string';
  if(!mobileFormat.test(inputPhoneNumber)) throw 'Please enter a valid Phone Number';
}
module.exports = {
   
    validObjectId:validObjectId,
    validName:validName,
    validStatus:validStatus,
    validString:validString,
    validLogin:validLogin,
    validEmail:validEmail,
    validPhoneNumber:validPhoneNumber
   
  };