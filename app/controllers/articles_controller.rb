class ArticlesController < ApplicationController
  def index
    @artilces = Article.all
    render json: {articles: @artilces, limit: 10,  offset: 0}
  end
end