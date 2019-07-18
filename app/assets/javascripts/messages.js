$(function(){

  function buildMessage(message){
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message-title">
                    <div class="message_username">${message.user_name}</div>
                    <p class="message_date">${message.created_at}</p>
                  </div>`
   
    if (message.content){
      html+= `<p class="message_text">${message.content}</p>`;
    }
    if (message.image.url){
      html+= `<img class="message_text__image" src="${message.image.url}" alt=${message.image.url}></img>`;
    }
    html += '</div>'

    return html;
  }
 


  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.right_chat').append(html);
      $("#new_message")[0].reset();
      $('.right_chat').animate({scrollTop: $('.right_chat')[0].scrollHeight}, 'fast');
      
    })
    .fail(function(){
      alert("エラー");
    })

    .always(()=>{
      $(".footer__form__btn").removeAttr("disabled");
    });
  });

  var reloadMessages = function(){
    var last_message_id = $('.message').last().data('id');
    $.ajax({
      url: "./api/messages",
      type: 'get',
      dataType: 'json',
      data:{id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildMessage(message);
      })
      $(".left-box").append(insertHTML);
      if (messages.length > 0){
        $('.right_chat').animate({scrollTop: $('.right_chat')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);

  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

});