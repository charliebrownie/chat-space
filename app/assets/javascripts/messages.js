$(function(){

  function buildMessage(message){

    var html = `<div class="message-title">
                  <div class="message">${message.user_name}</div>
                  <p class="message_date">${message.created_at}</p>
                </div>
                <p class="message_text">${message.content}</p>`
    
    if (message.image.url){
      html+= `<img class="message_text__image" src="${message.image.url}" alt=${message.image.url}></img>`
    }

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
});