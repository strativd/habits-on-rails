class AddEmojiToHabits < ActiveRecord::Migration[6.0]
  def change
    add_column :habits, :emoji, :string
    add_column :habits, :order, :integer
  end
end
