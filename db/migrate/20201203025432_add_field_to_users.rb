class AddFieldToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :token, :string
    add_column :users, :username, :string
    add_column :users, :image, :string
    add_column :users, :bio, :string
  end
end
