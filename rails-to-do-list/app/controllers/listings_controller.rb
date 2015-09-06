class ListingsController < ApplicationController

  def index
    @personal = {'name' => 'Yamada', 'old' => 28}

    respond_to do |format|
      format.html
      format.json { render json: @personal }
    end
  end
end
