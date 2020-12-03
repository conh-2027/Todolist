# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first


User.create(username: "abc", password: "123123", email: "huuco2401@gmail.com")
Tag.create(name: "angular")
Article.create(
  slug: 'how-to-train-your-dragon',
  title: 'how-to-train-your-dragon',
  description: "Ever wonder how?",
  body: 'It takes a Jacobian',
  tag_id: Tag.ids.first,
  favorited: false,
  favoritesCount: 0,
  user_id: User.ids.first
)