/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
$(document).ready(function(){
 
    
  $('#pendingBtn').click(function(e) {
        e.preventDefault();
        $('.modalPending').empty();
        var requestConfig = {
          method: 'GET',
          url: '/followRequest',
          contentType: 'application/json',
        };
        $.ajax(requestConfig).then(function (responseMessage) {
          if(responseMessage !=false){
           
            for(data of responseMessage){
              $('.modalPending').append(`
                <div class="d-flex justify-content-around mt-2 mb-2">
                <div class="d-flex flex-row align-items-center">
                    <div class="userProfile"><img src="${data.profilePicture}"  alt="..."></div>
                    <div class="ms-2 ml-2 ">
                        <p class="mb-0">${data.userName}</p>
                    </div> 
                    
                </div>
                <button class="btn btn-success acceptBtn" name="${data._id}">Accept</button>
                <button class="btn btn-danger declineBtn" name="${data._id}">Decline</button>
              
              </div>`);
            }
          }
          else{
            $('.modalPending').append('No Pending Request!');
          }
          
         
        });      
       
  });
  $("body").on("click", ".acceptBtn", function(e){
    e.preventDefault();
    var id = $(this).prop("name");
    // alert(id);
    var requestConfig = {
      method: 'POST',
      url: '/followRequest',
      contentType: 'application/json',
      data: JSON.stringify({
        id:id
      })
    };
    $.ajax(requestConfig).then(function (responseMessage) {
      if(responseMessage !=false){
        $('[name='+id+']').parent().remove();
      }
      else{
        swal({
          title: "Oops!",
          text: "Cannot accept!",
          icon: "error",
          button: "okay",
        });
      }
      
     
    });
  });

  $("body").on("click", ".declineBtn", function(e){
    e.preventDefault();
    var id = $(this).prop("name");
    // alert(id);
    var requestConfig = {
      method: 'DELETE',
      url: '/followRequest',
      contentType: 'application/json',
      data: JSON.stringify({
        id:id
      })
    };
    $.ajax(requestConfig).then(function (responseMessage) {
      if(responseMessage !=false){
        $('[name='+id+']').parent().remove();
      }
      else{
        swal({
          title: "Oops!",
          text: "cannot decline!",
          icon: "error",
          button: "okay",
        });
      }
    
     
    });
  
  $("#followerBtn").click(function (e) {
    e.preventDefault();
    var requestConfig = {
      method: "GET",
      url: "/followers",
      contentType: "application/json",
    };
    console.log("FOLLOWERS");
    $.ajax(requestConfig).then(function (responseMessage) {
      $(".modalFollowers").empty();
      for (const data of responseMessage) {
        $(".modalFollowers").append(`
          <div class="d-flex justify-content-around mt-2 mb-2">
          <div class="d-flex flex-row align-items-center">
              <div class="userProfile"><img src="${data.profilePicture}"  alt="..."></div>
              <div class="ms-2 ml-2 ">
                  <p class="mb-0">${data.userName}</p>
              </div> 
          </div>
          <button class="btn btn-success followBtn" name="${data._id}">Follow</button>
        
        </div>`);
      }
    });
  });

  $("#followingBtn").click(function (e) {
    e.preventDefault();
    var requestConfig = {
      method: "GET",
      url: "/followings",
      contentType: "application/json",
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      $(".modalFollowing").empty();
      for (const data of responseMessage) {
        $(".modalFollowing").append(`
        <div class="d-flex justify-content-around mt-2 mb-2">
        <div class="d-flex flex-row align-items-center">
            <div class="userProfile"><img src="${data.profilePicture}"  alt="..."></div>
            <div class="ms-2 ml-2 ">
                <p class="mb-0">${data.userName}</p>
            </div> 
        </div>
        <button class="btn btn-success unfollowBtn" name="${data._id}">Unfollow</button>
      
      </div>`);
      }
    });
  });

  $("body").on("click", ".followBtn", function (e) {
    e.preventDefault();
    var id = $(this).prop("name");
    // alert(id.toString());
    var requestConfig = {
      method: "POST",
      url: "/followers/follow",
      contentType: "application/json",
      data: JSON.stringify({
        id: id.toString(),
      }),
    };
    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage != false) {
        $("[name=" + id + "]")
          .parent()
          .remove();
      } else {
        // no accepted
      }
    });
  });

  $("body").on("click", ".unfollowBtn", function (e) {
    e.preventDefault();
    var id = $(this).prop("name");
    // alert(id.toString());
    var requestConfig = {
      method: "DELETE",
      url: "/followings/unfollow",
      contentType: "application/json",
      data: JSON.stringify({
        id: id.toString(),
      }),
    };
    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage != false) {
        $("[name=" + id + "]")
          .parent()
          .remove();
      } else {
        // no accepted
      }
    });
  });

  // $("#profilePicture").click(function (e) {
  //   e.preventDefault();
  //   // var requestConfig = {
  //   //   method: "POST",
  //   //   url: "/uploadImage",
  //   //   contentType: "application/json",
  //   // };
  // $.ajax({
  //   type: "POST",
  //   url: "/users",
  //   contentType: "application/json",
  //   // data: JSON.stringify(newPost),
  //   // dataType: "text",
  //   success: function (responseMessage) {
  //     console.log(responseMessage);
  //     $.ajax({
  //       type: "POST",
  //       url: "/uploadImage",
  //       contentType: false,
  //       data: formData,
  //       processData: false,
  //       success: function (responseMessage) {
  //         console.log(responseMessage);
         
  //       },
  //       error: function (error) {
  //           console.log(error);
  //       },
  //     });
  //   },
  //   error: function (error) {
  //       console.log(error);
  //   },
  // });
// })});
});
});

$(document).ready(function(){
  // Prepare the preview for profile picture
      $("#profilePicture").change(function(){
          readURL(this);
      });
  });
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
  
          reader.onload = function (e) {
              $('#picturePreviewBtn').attr('src', e.target.result).fadeIn('slow');
          }
          reader.readAsDataURL(input.files[0]);
      }
}