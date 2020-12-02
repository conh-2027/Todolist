class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :slug
      t.string :title
      t.string :description
      t.string :body
      t.boolean :favorited
      t.integer :favoritesCount
      t.references :user, foreign_key: true
      t.references :tag_list, foreign_key: true

      t.timestamps
    end
  end
end
