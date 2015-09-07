class ListingsController < ApplicationController

  def index
    @todos = {'todo' => 'Pat a dog', 'completed' => true}

    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end
end
