/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
$(document).ready(function(){
    $( "#homeBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/home";
      });
      $( "#feedBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/home/feed/63963928ac02e3a9db204155";
      });
      $( "#mostLikesBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/1";

      });
      $( "#oldestBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/2";

      });
      $( "#newestBtn" ).click(function(e) {
        e.preventDefault();
        window.location = "/filters/3";

      });
      
      $( ".savedPostBtn" ).click(function(e) {
        e.preventDefault();
        var postId = $(this).prop('id');
        if($("#"+postId).find('.fa-bookmark').css("color")==="rgb(255, 255, 255)"){
            
            var requestConfig = {
                method: 'POST',
                url: '/savedPosts',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  })
              };
      
              $.ajax(requestConfig).then(function (responseMessage) {
                if(responseMessage === true){
                    
                    $("#"+postId).find('.fa-bookmark').css("color", "black");
                 
                }
                else{
                    $("#"+postId).find('.fa-bookmark').css("color", "white");  
                }
              });
        }
        else{
            var requestConfig = {
                method: 'DELETE',
                url: '/savedPosts',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  })
              }; 
      
              $.ajax(requestConfig).then(function (responseMessage) {
                if(responseMessage === true){
                    
                    $("#"+postId).find('.fa-bookmark').css("color", "white");
                 
                }
                else{
                    $("#"+postId).find('.fa-bookmark').css("color", "black");  
                }
              });
        }
      
      });

      $( ".likesBtn" ).click(function(e) {
        e.preventDefault();
        var postId = $(this).prop('name');
        if($('[name='+postId+']').find('.fa-heart').css("color")==="rgb(255, 255, 255)"){
            
            var requestConfig = {
                method: 'POST',
                url: '/likes',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  })
              };
      
              $.ajax(requestConfig).then(function (responseMessage) {
                if(responseMessage.added === true){
                  $('[name='+postId+']').find('.fa-heart').css("color","red");
                  // var likes = parseInt($('[name='+postId+']').find('p').html());
                  // alert(parseInt($('[name='+postId+']').find('p').html()));
                  $('[name='+postId+']').find('p').text((responseMessage.likes)+" Likes"); 
                }
                else{
                  $('[name='+postId+']').find('.fa-heart').css("color","white"); 
                  
                }
              });
        }
        else{
            var requestConfig = {
                method: 'DELETE',
                url: '/likes',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId:postId
                  })
              };
      
              $.ajax(requestConfig).then(function (responseMessage) {
                if(responseMessage.deleted === true){
                  
                  $('[name='+postId+']').find('.fa-heart').css("color","white");
                  $('[name='+postId+']').find('p').text((responseMessage.likes) +" Likes");
                  
                  // var likes = parseInt($('[name='+postId+']').find('p').html());
                  // alert(parseInt($('[name='+postId+']').find('p').html()));
                }
                else{
                  $('[name='+postId+']').find('.fa-heart').css("color","red"); 
                }
              });
        }
      
      });

      

});