class ListsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @todos = List.where(user_id: current_user.id)
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def create
    updated_attr = list_attr.merge({user_id: current_user.id})
    @todo = List.create(updated_attr)
    respond_to do |format|
      format.html {redirect_to action: 'index', status: :ok}
      format.json { render json: @todo }
    end

  end

  private

  def list_attr
    params.require(:list).permit(:todo, :completed)
  end
end
