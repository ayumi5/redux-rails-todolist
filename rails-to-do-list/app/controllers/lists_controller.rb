class ListsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @todos = List.all
    respond_to do |format|
      format.html
      format.json { render json: {todos: @todos} }
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
