/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
$(document).ready(function(){
    $( ".homeBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/home";
      });
      $( "#feedBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/home/feed";
      });
      $( "#mostLikesBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/mostlikes";

      });
      $( "#oldestBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/oldest";

      });
      $( "#newestBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/newest";

      });
      $( "#userSavedPosts" ).click(function(e) {
        e.preventDefault();
        window.location = "/savedPosts";

      });
      $(".commentsBtn" ).click(function(e) {
        e.preventDefault();
        var postId = $(this).prop('name');
        $('.allComments').empty();
        $('.allComments').attr('name',postId);

        $.ajax({
          method: 'POST',
          url: '/comments',
          contentType: 'application/json',
          data: JSON.stringify({
              postId:postId
            }),
        success: function (responseMessage) {
          if(responseMessage){
           
            for(data of responseMessage){
              $('.allComments').append(`<div class="d-flex justify-content-between mt-2 mb-2">
              <div class="d-flex flex-row align-items-center">
                  <div class="userProfile"><img src="${data.profilePicture}"  alt="profile"></div>
                  <div class="ms-2 ml-2 ">
                      <p class="mb-0">${data.userName}</p>
                      <div class="badge"> <span>${data.commentContent}</span> </div>
                  </div> 
              </div>
              </div>`);
            }
          }
          else{
            $('.allComments').empty();
          }
         
        },
        error: function (error) {
          swal({
            title: "Oops!",
            text: "No Comments found!",
            icon: "error",
            button: "okay",
          });
        },
      });

      });
      
      $('#addComment').submit(function(e) {
            e.preventDefault();
            var comment = $("#comment").val();
            var postId = $(".allComments").attr("name");
            if (comment.trim() === ""){
              $('.error').text("");
              $('.error').text("Comment cannot be empty!");
              return;
            }
            else if(comment.trim().length>20){
              $('.error').text("");
              $('.error').text("Comment cannot be more than 20 characters!");
              return;
            }
            else{
              $('.error').text("");
            }

            $.ajax({
              method: 'POST',
              url: '/comments/content',
              contentType: 'application/json',
              data: JSON.stringify({
                  comment:comment,
                  postId:postId
                }),
            success: function (responseMessage) {
              if(responseMessage){
               
                $('input[name=comment]').val('');
                  $('.allComments').append(`<div class="d-flex justify-content-between mt-2 mb-2">
                  <div class="d-flex flex-row align-items-center">
                      <div class="userProfile"><img src="${responseMessage[1]}"  alt="userprofile."></div>
                      <div class="ms-2 ml-2 ">
                          <p class="mb-0">${responseMessage[0]}</p>
                          <div class="badge"> <span>${responseMessage[2]}</span> </div>
                      </div> 
                  </div>
                  </div>`);
                
              }
              else{
                $('input[name=comment]').val('');
              }
             
            },
            error: function (error) {
              swal({
                title: "Oops!",
                text: "Something Went wrong! Cannot add comment",
                icon: "error",
                button: "okay",
              });
            },
          });
            
           
      });

      $( ".savedPostBtn" ).click(function(e) {
        e.preventDefault();
        var postId = $(this).prop('id');
        if($("#"+postId).find('.fa-bookmark').css("color")==="rgb(255, 255, 255)"){
            

              $.ajax({
                method: 'POST',
                url: '/savedPosts',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  }),
              success: function (responseMessage) {
                if(responseMessage === true){
                    
                  $("#"+postId).find('.fa-bookmark').css("color", "black");
               
              }
              else{
                  $("#"+postId).find('.fa-bookmark').css("color", "white");  
              }
               
              },
              error: function (error) {
                swal({
                  title: "Oops!",
                  text: "Cannot save this post!",
                  icon: "error",
                  button: "okay",
                });
              },
            });

        }
        else{
           
              $.ajax({
                method: 'DELETE',
                url: '/savedPosts',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  }),
              success: function (responseMessage) {
                if(responseMessage === true){
                    
                  $("#"+postId).find('.fa-bookmark').css("color", "white");
               
              }
              else{
                  $("#"+postId).find('.fa-bookmark').css("color", "black");  
              }
               
              },
              error: function (error) {
                swal({
                  title: "Oops!",
                  icon: "error",
                  button: "okay",
                });
              },
            });


        }
      
      });

      $( ".likesBtn" ).click(function(e) {
        e.preventDefault();
        var postId = $(this).prop('name');
        if($('[name='+postId+']').find('.fa-heart').css("color")==="rgb(255, 255, 255)"){
            

              $.ajax({
                method: 'POST',
                url: '/likes',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  }),
              success: function (responseMessage) {
                if(responseMessage.added === true){
                  $('[name='+postId+']').find('.fa-heart').css("color","red");
                  // var likes = parseInt($('[name='+postId+']').find('p').html());
                  // alert(parseInt($('[name='+postId+']').find('p').html()));
                 $('[name='+postId+']').find('.no_likes').text((responseMessage.likes)); 
                }
                else{
                  $('[name='+postId+']').find('.fa-heart').css("color","white"); 
                  
                }
               
              },
              error: function (error) {
                swal({
                  title: "Oops!",
                  icon: "error",
                  button: "okay",
                });
              },
            });



        }
        else{
           

              $.ajax({
                method: 'DELETE',
                url: '/likes',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  }),
              success: function (responseMessage) {
                if(responseMessage.deleted === true){
                  
                  $('[name='+postId+']').find('.fa-heart').css("color","white");
                  $('[name='+postId+']').find('.no_likes').text((responseMessage.likes));
                  
                  // var likes = parseInt($('[name='+postId+']').find('p').html());
                  // alert(parseInt($('[name='+postId+']').find('p').html()));
                }
                else{
                  $('[name='+postId+']').find('.fa-heart').css("color","red"); 
                }
               
              },
              error: function (error) {
                swal({
                  title: "Oops!",
                  icon: "error",
                  button: "okay",
                });
              },
            });

        }
      
      });

      $('#searchTag').submit(function(e) {
        e.preventDefault();
        var tag = $(".search").val();
        if (tag.trim() === ""){
          return swal({
            title: "Oops!",
            text: "Enter valid text!",
            icon: "error",
            button: "okay",
          });
        }
        $.ajax({
          type: "POST",
          url: "/filters/tags",
          contentType: 'application/json',
          data: JSON.stringify({
              tag:tag
            }),
        success: function (responseMessage) {
          if(responseMessage!=false){
            $('.myposts').empty();
            $('.myposts').append(responseMessage);
          }
          else{
            swal({
              title: "Oops!",
              text: "NO POST FOUND!",
              icon: "error",
              button: "okay",
            });
          }
         
        },
        error: function (error) {
          swal({
            title: "Oops!",
            text: "No Post Found!",
            icon: "error",
            button: "okay",
          });
        },
      });
       
        
       
  });

  $(".shareBtn" ).click(function(e) {
    e.preventDefault();
    var postId = $(this).prop('name');
    $('.allUsers').empty();
    $('.allUsers').attr('name',postId);
   

    $.ajax({
      method: 'GET',
      url: '/followers',
      contentType: 'application/json',
    success: function (responseMessage) {
      if(responseMessage){
       
        for(data of responseMessage){
          $('.allUsers').append(`<div class="d-flex justify-content-center mt-2 mb-2">
          <div class="d-flex flex-row align-items-center">
              <div class="userProfile"><img src="${data.profilePicture}"  alt="profile"></div>
              <div class="ms-2 ml-2 ">
                  <p class="mb-0">${data.userName}</p>
                  <div class="badge"> <button class="btn btn-success sentBtn" name="${data._id}" value="${postId}">Send</button> </div>
              </div> 
          </div>
          </div>`);
        }
      }
      else{
        $('.allUsers').empty();
      }
     
    },
    error: function (error) {
      swal({
        title: "Oops!",
        text: "No Followings Found to share !",
        icon: "error",
        button: "okay",
      });
    },
  });

  });


  $("body").on("click", ".sentBtn", function(e){
    e.preventDefault();
    var userId = $(this).prop('name');
    var postId = $(this).prop('value');
    // var requestConfig = {
    //   method: 'POST',
    //   url: '/conversations/startConvo',
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     otherUserId:userId,
    //     message:postId
    //   })
    // };

    // $.ajax(requestConfig).then(function (responseMessage) {
    //   if(responseMessage){
    //     console.log(responseMessage)
    //   }
    //   else{
    //     console.log(responseMessage)
    //   }
      
     
    // });

    $.ajax({
      method: 'POST',
      url: '/conversations/startConvo',
      contentType: 'application/json',
      data: JSON.stringify({
        otherUserId:userId,
        message:postId
      }),
    success: function (responseMessage) {
      alert(responseMessage);
        swal({
          text: "Successfully sent!",
          icon: "success",
          button: "okay!",
        });
      
     
     
    },
    error: function (error) {
      swal({
        title: "Oops!",
        text: "Something Went Wrong!",
        icon: "error",
        button: "okay",
      });
    },
  });
   

  });


  $(".dmBtn" ).click(function(e) {
    e.preventDefault();
    $('.allFollowers').empty();
    // var requestConfig = {
    //   method: 'GET',
    //   url: '/conversations',
    //   contentType: 'application/json',
    // };

    // $.ajax(requestConfig).then(function (responseMessage) {
    //   if(responseMessage){
       
    //     for(data of responseMessage){
    //       $('.allFollowers').append(`<div class="d-flex justify-content-center mt-2 mb-2">
    //       <div class="d-flex flex-row align-items-center">
    //           <div class="userProfile"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTAYhFkNrmRfN1VFDiPc-H-l2FEm5MRs2raw&usqp=CAU"  alt="..."></div>
    //           <div class="ms-2 ml-2 ">
    //               <p class="mb-0">${data.firstName} ${data.lastName}</p>
    //               <div class="badge"> <button class="btn btn-success startDMBtn name="${data._id.toString()}">DM</button> </div>
    //           </div> 
    //       </div>
    //       </div>`);
    //     }
    //   }
    //   else{
    //     $('.allFollowers').empty();
    //   }
      
     
    // });
    $.ajax({
      method: 'GET',
      url: '/followers/followersandfollowing',
      contentType: 'application/json',
    success: function (responseMessage) {
      if(responseMessage){
       
        for(data of responseMessage){
          $('.allFollowers').append(`<div class="d-flex justify-content-center mt-2 mb-2">
          <div class="d-flex flex-row align-items-center">
              <div class="userProfile"><img src="${data.profilePicture}"  alt="..."></div>
              <div class="ms-2 ml-2 ">
                  <p class="mb-0">${data.firstName} ${data.lastName}</p>
                  <div class="badge"> <button class="btn btn-success startDMBtn name="${data._id.toString()}">DM</button> </div>
              </div> 
          </div>
          </div>`);
        }
      }
      else{
        $('.allFollowers').empty();
      }
     
    },
    error: function (error) {
      swal({
        title: "Oops!",
        text: "Something Went Wrong",
        icon: "error",
        button: "okay",
      });
    },
  });
  });

  $("body").on("click", ".startDMBtn", function(e){
    e.preventDefault(e);
    var userId = $(this).prop('name');
  //   var requestConfig = {
  //     method: 'POST',
  //     url: '/conversations/',
  //     contentType: 'application/json',
  //     data: JSON.stringify({
  //       userId:userId,
  //     })
  //   };

  //   $.ajax(requestConfig).then(function (responseMessage) {
  //     if(responseMessage){
  //       console.log(responseMessage)
  //     }
  //     else{
  //       console.log(responseMessage)
  //     }
      
     
  //   });

  // });

  $.ajax({
    method: 'POST',
      url: '/conversations/startConvo',
      contentType: 'application/json',
      data: JSON.stringify({
        userId:userId,
      }),
  success: function (responseMessage) {
    if(responseMessage){
      swal({
        text: "Successfully sent!",
        icon: "success",
        button: "okay!",
      });
    }
    else{
      swal({
        text: "Cannot sent Successfully!",
        icon: "error",
        button: "okay!",
      });
    }
   
  },
  error: function (error) {
    swal({
      title: "Oops!",
      text: "Something Went Wrong!",
      icon: "error",
      button: "okay",
    });
  },
});

});

$('.commentClose').on('click', function () {
  location.reload();
 })

 $('#searchUser').submit(function(e) {
  e.preventDefault();
  var user = $(".searchuser").val();
  if (user.trim() === ""){
    return swal({
      title: "Oops!",
      text: "Enter valid text!",
      icon: "error",
      button: "okay",
    });
  }
  $.ajax({
    type: "POST",
    url: "/users/searchUsers",
    contentType: 'application/json',
    data: JSON.stringify({
        user:user
      }),
  success: function (responseMessage) {
    if(responseMessage!=false){
      swal({
        title: "Oops!",
        text: " FOUND!",
        icon: "success",
        button: "okay",
      });
    }
    else{
      swal({
        title: "Oops!",
        text: "NO User FOUND!",
        icon: "error",
        button: "okay",
      });
    }
   
  },
  error: function (error) {
    swal({
      title: "Oops!",
      text: "No User Found!",
      icon: "error",
      button: "okay",
    });
  },
});
 
  
 
});

});