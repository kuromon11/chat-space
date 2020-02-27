$(function(){
    function buildHTML(message){
      // 「もしメッセージに画像が含まれていたら」という条件式
      if (message.image) {
        //メッセージに画像が含まれる場合のHTMLを作る
        var html = 
          `<div class="message" data-message-id=${message.id}>
            <div class="message__upper">
              <div class="message__upper__name">
                ${message.user_name}
              </div>
              <div class="message__upper__history">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="message__text__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} class="message__text__image" >
          </div>`
        return html;
      } else {
        //メッセージに画像が含まれない場合のHTMLを作る
        var html = 
          `<div class="message" data-message-id=${message.id}>
            <div class="message__upper">
              <div class="message__upper__name">
                ${message.user_name}
              </div>
              <div class="message__upper__history">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="message__text__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html
      }
    }

  //submitのイベントをする
  $('#new_message').on('submit', function(e){
    //ビューファイルを送信するアクションを止める
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
    })
  });
});