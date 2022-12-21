$("#post-form").submit(function (e) {
    e.preventDefault();
    var caption = $("#caption").val();
    var tag = $("#tag").val();
    const  fileType = $('[type=file]').val().split('.').pop().toLowerCase();
    var  filename = '/public/uploads/'+$('[type=file]').val().split('\\').pop().toLowerCase();
    const onlyFilename = $("#imageUpload")[0].files;
    var validImageTypes = ['jpg', 'jpeg', 'png'];
    
            if (caption.trim() === ""){
              $('.postError').text("");
              $('.postError').text("Caption cannot be empty!");
              return;
            }
            else if (tag.trim() === ""){
                $('.postError').text("");
                $('.postError').text("Tag cannot be empty!");
                return;
            }
            else if ($.inArray(fileType, validImageTypes) == -1){
                $('.postError').text("");
                $('.postError').text("Please Upload valid Image file!");
                return;
            }
            else{
              $('.postError').text("");
            }
            const newPost = {
                caption:caption,
                tags:tag,
                postContent:filename
              };
              var formData = new FormData();

                for (let i = 0; i < onlyFilename.length; i++) {
                  const file = onlyFilename[i];
                  formData.append("postContent", file);
                }
        
            $.ajax({
                type: "POST",
                url: "/posts",
                contentType: "application/json",
                data: JSON.stringify(newPost),
                dataType: "text",
                success: function (responseMessage) {
                  console.log(responseMessage);
                  $.ajax({
                    type: "POST",
                    url: "/uploadImage",
                    contentType: false,
                    data: formData,
                    processData: false,
                    success: function (responseMessage) {
                      swal({
                        title: "Done!",
                        text: "Post created!",
                        icon: "success",
                        button: "okay",
                      }).then( function() {
                        location.reload();
                      });
                     
                    },
                    error: function (error) {
                      swal({
                        title: "Oops!",
                        text: "Post cannot be created!",
                        icon: "success",
                        button: "okay",
                      });
                    },
                  });
                  
                },
                error: function (error) {
                  swal({
                    title: "Oops!",
                    text: "Post cannot be created!",
                    icon: "success",
                    button: "okay",
                  });
                },
              });
});