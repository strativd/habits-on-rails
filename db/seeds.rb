# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
puts "🌱🌱🌱 SEEDING DB..."
puts "🌱"

seed_habits = [
  {
    title: '💦 FILL WATER BOTTLE',
    goal: 3,
    period: 'daily',
    slug: 'fill-water-bottle',
  },
  {
    title: '💊 VITAMIN D',
    goal: 1,
    period: 'daily',
    slug: 'vitamin-d',
  },
  {
    title: '💩 FIBER SUPPLEMENT',
    goal: 2,
    period: 'daily',
    slug: 'vitamin-d',
  },
]

no_habits = !Habit.exists?
no_habit_steps = !Step.exists?

if no_habits
  puts "🌱  NO HABITS FOUND."

  seed_habits.each do |habit|
    Habit.create(habit)
    puts "🌱  ADD HABIT  =>  \'#{habit[:title]}\'"
  end
end

if no_habit_steps
  habits = Habit.all
  # Get Monday of this week to record habit steps
  today = Date.today
  weekday = today.wday
  monday = today - weekday + 1

  7.times do |i|
    date = monday + i

    habits.each do |habit|
      Step.create(
        habit_id: habit.id,
        date: date,
        goal: habit.goal,
        progress: 1,
      )
    end

    puts "🌱  ADD STEPS  =>  For each habit on #{date}"
  end
end

puts "🌱"
puts "🌱🌱🌱 DB SEEDED 🌳"
