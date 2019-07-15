$(function(){

  function buildMessage(message){
    var html = `<div class="message-title">
                <div class="message">
                ${message.user_name}
                </div>
                <p class="message_date">
                ${message.created_at}
                </p>
                </div>
                <p class="message_text">
                ${message.content}
                </p>`;
    return html;
  }


  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $("#message_content").val("")
    })
    .fail(function(){
      alert("エラー");
    })

    .always(()=>{
      $(".footer__form__btn").removeAttr("disabled");
    });
  });
});