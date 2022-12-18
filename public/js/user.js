$(document).ready(function () {
  $("#followerBtn").click(function (e) {
    e.preventDefault();
    var requestConfig = {
      method: "GET",
      url: "/followers",
      contentType: "application/json",
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      $(".modalFollowers").empty();
      for (const data of responseMessage) {
        $(".modalFollowers").append(`
          <div class="d-flex justify-content-around mt-2 mb-2">
          <div class="d-flex flex-row align-items-center">
              <div class="userProfile"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTAYhFkNrmRfN1VFDiPc-H-l2FEm5MRs2raw&usqp=CAU"  alt="..."></div>
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
            <div class="userProfile"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTAYhFkNrmRfN1VFDiPc-H-l2FEm5MRs2raw&usqp=CAU"  alt="..."></div>
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
});