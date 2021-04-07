namespace :db do
  namespace :seed do
    task :with => :environment do
      filename = Dir[File.join(Rails.root, 'db', 'seeds', "#{ENV['SEED']}.rb")][0]
      load(filename) if File.exist?(filename)
    end
  end
end
