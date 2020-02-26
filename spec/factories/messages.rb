FactoryBot.define do
  factory :message do
    #メッセージの文章
    content {Faker::Lorem.sentence}
    #画像
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    #投稿するユーザー
    user
    #投稿するユーザーが選択しているグループ
    group
  end
end

