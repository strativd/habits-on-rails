class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.belongs_to :habit, index: true, foreign_key: true
      t.date :date
      t.integer :goal
      t.integer :progress
      t.boolean :is_complete

      t.timestamps
    end

    add_index [:date, :habit_id], unique: true
  end
end
