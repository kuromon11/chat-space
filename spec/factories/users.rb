FactoryBot.define do
  factory :user do
    #パスワード(ダミー用)
    password = Faker::Internet.password(min_length: 8)
    #ユーザー名
    name {Faker::Name.last_name}
    #メールアドレス
    email {Faker::Internet.free_email}
    #パスワード()
    password {password}
    #パスワード確認
    password_confirmation {password}
  end
end