class ListingsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @todos = [{'todo' => 'Pat a dog', 'completed' => true}, {'todo' => 'Play with a dog', 'completed' => false}]
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def create
    redirect_to action: 'index', status: :ok
  end
end
