class Article < ApplicationRecord
  belongs_to :user
  belongs_to :tag_list
end
