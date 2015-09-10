class ListsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @todos = [{'todo' => 'Pat a dog', 'completed' => true}, {'todo' => 'Play with a dog', 'completed' => false}]
    respond_to do |format|
      format.html
      format.json { render json: {test: "test"} }
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
