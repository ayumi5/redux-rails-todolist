class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :todo
      t.boolean :completed
      t.timestamps null: false
    end
  end
end
