class ListingsController < ApplicationController

  def index
    @todos = [{'todo' => 'Pat a dog', 'completed' => true}, {'todo' => 'Play with a dog', 'completed' => false}]

    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end
end
