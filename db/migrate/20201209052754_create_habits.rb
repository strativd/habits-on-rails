class CreateHabits < ActiveRecord::Migration[6.0]
  def change
    create_table :habits do |t|
      t.text :title
      t.integer :goal
      t.string :period
      t.string :slug

      t.timestamps
    end
  end
end
