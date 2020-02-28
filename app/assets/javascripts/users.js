$(function(){
  //ユーザー見つかる
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>`;
    $("#user-search-result").append(html);
  }
  //ユーザー見つからない
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`;
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function(){
    let input = $("#user-search-field").val();    //フォームの値を取得して変数に代入する
    $.ajax({
      type: "GET",//HTTPメソッド
      url: "/users", //users_controllerの、indexアクションにリクエストの送信先を設定する
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      //他にグループに入っていないユーザーがいる
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        //inputの返り値がない（入力されていない）
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  // $(document).on("click", ".chat-group-user__btn--add", function() {
  //   console.log("追加")
  // });
  // $(document).on("click", ".chat-group-user__btn--remove", function() {
  //   console.log("削除")
  // });
});