class ListsController < ApplicationController
  protect_from_forgery except: [:create]
  before_action :authenticate_user!

  def index
    @todos = [{'todo' => 'Pat a dog', 'completed' => true}, {'todo' => 'Play with a dog', 'completed' => false}]
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def create
    @list = List.create(list_attr)
    redirect_to action: 'index', status: :ok
  end

  private

  def list_attr
    params.require(:list).permit(:todo, :completed)
  end
end
