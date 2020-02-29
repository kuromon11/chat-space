$(function(){
  var buildHTML = function(message) {
    var message_info = `<div class="message-upper">` +
          `<div class="message__upper__name">` +
            message.user_name +
          `</div>` +
          `<div class="message__upper__history">` +
            message.created_at +
          `</div>` +
        `</div>`
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.content && message.image) {
      //メッセージに画像が含まれる場合のHTMLを作る。data-idが反映されるようにしている。文章と画像。
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        message_info +
        `<div class="message__text">` +
          `<p class="message__text__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="message__text__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている。文章だけ。
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        message_info +
        `<div class="message__text">` +
          `<p class="message__text__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている。画像だけ
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        message_info +
        `<div class="message__text">` +
          `<img src="` + message.image + `" class="message__text__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

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
      //messagesクラスが適用されているdiv要素の子要素の一番最後に追加
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    //処理が完了すれば必ず実行する
    .always(function(data){
      //prop()を使ったdisabled属性の解除。input要素をfalseで無効化。
      $('input').prop('disabled', false);
    });
  });

// 相手側
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",  //同期通信でいう『パス』
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id},  
    })
    .done(function(messages){
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //messagesクラスが適用されているdiv要素の子要素の一番最後に追加
        $('.messages').append(insertHTML);
        // $('form')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
