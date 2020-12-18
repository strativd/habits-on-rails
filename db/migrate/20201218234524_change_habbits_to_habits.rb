class ChangeHabbitsToHabits < ActiveRecord::Migration[6.0]
  def change
    rename_table :habbits, :habits
  end
end
