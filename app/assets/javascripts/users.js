$(function() {
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
  //追加候補にあるユーザーを削除
  function addDeleteUser(name, id) {
    let html = `
      <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  //メンバー一覧に新たにユーザーを追加
  function addMember(userId) {
    let html = `
      <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
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
  //追加をクリックするとグループに所属していないユーザーを新たに追加する
  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    //チャットメンバーから要素を削除する
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  //削除をクリックするとグループに所属しているユーザーを削除する
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});