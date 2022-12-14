$(document).ready(function(){
    $( "#followerBtn" ).click(function(e) {
        e.preventDefault();
        var requestConfig = {
            method: 'GET',
            url: '/followers',
            contentType: 'application/json',
          };
  
          $.ajax(requestConfig).then(function (responseMessage) {
            $('.modal-body').empty();
            for (const data of responseMessage) {
                $(".modal-body").append(`<p>${data.userName}</p>`);
            }
          });
      });
      $( "#followingBtn" ).click(function(e) {
        e.preventDefault();
        var requestConfig = {
            method: 'GET',
            url: '/followings',
            contentType: 'application/json',
          };
  
          $.ajax(requestConfig).then(function (responseMessage) {
            $('.modal-body').empty();
            for (const data of responseMessage) {
                $(".modal-body").append(`<p>${data.userName}</p>`);
            }
          });
      

      });

    });