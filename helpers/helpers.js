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
module.exports = {
   
    validObjectId:validObjectId,
    validName:validName,
    validStatus:validStatus,
    validString:validString
   
  };