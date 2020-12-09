class CreateHabbits < ActiveRecord::Migration[6.0]
  def change
    create_table :habbits do |t|
      t.text :title
      t.integer :goal
      t.string :period
      t.string :slug

      t.timestamps
    end
  end
end
