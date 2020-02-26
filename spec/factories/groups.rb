FactoryBot.define do
  factory :group do
    #グループ名
    name {Faker::Team.name}
  end
end