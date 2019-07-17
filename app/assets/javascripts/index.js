$(function(){

  
  function buildUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }

  function buildAdd(id, name){
    var html2 = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html2;
  } 

  function buildDelete(){
    var html3 = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                 </div>`
    return html3;
  } 


  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          var html = buildUser(user);
          $("#user-search-result").append(html);
        });
      } else {
          var html3 = buildDelete();
          $("#user-search-result").append(html3);
        };


    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });


  $("#user-search-result").on('click', ".user-search-add", function(){
    var id=$(this).attr('data-user-id');
    var name=$(this).attr('data-user-name');
    var html2 = buildAdd(id, name);
    $("#chat-group-users").append(html2);
    $("#user-search-result").empty();
  });

  $(".chat-group-form__field--right").on('click', ".js-remove-btn", function(){
    $(this).parent().remove();
  })
});






