puts "🌱🌱🌱 ORDERING HABITS..."
puts "🌱"

habits = Habit.all.sort_by { |habit| habit.created_at }

habits.each.with_index(1) do |habit, index|
  habit.order = index
  
  puts "🌱  #{habit.order} => #{habit.title}"
end

puts "🌱"
puts "🌱🌱🌱 DB SEEDED 🌳"
