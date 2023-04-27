require 'csv'

# run this file in the terminal using the "ruby" command

csv_file = File.read('/Users/benanandappa/Documents/git_repos/family-history/docs/_data/testementary_summaries.csv')
csv_data = CSV.parse(csv_file, headers: true)

csv_data.each do |row|
  # Define variables for the post data
  deceased = row['Deceased']
  year = row['Year']
  petitioner = row['Petitioner']
  content = row['gpt_text']
  image_file = row['File']
  relationship = row["petitioner_relationship"]

  title = "Testementary of " + deceased
  
  # Define the Jekyll post file name based on the date and title
  post_name = "#{deceased.downcase.gsub(' ', '-')}.md"
  
  # Create the Jekyll post file and populate it with the data
  File.open("/Users/benanandappa/Documents/git_repos/family-history/docs/_newspaper/#{post_name}", "w") do |file|
    file.write("---\n")
    file.write("layout: testamentary\n")
    file.write("title: #{title}\n")
    file.write("name: #{deceased}\n")
    file.write("year: #{year}\n")
    file.write("source: Ceylon Government Gazette\n")
    file.write("image_file: #{image_file}\n")
    file.write("petitioner: #{petitioner}\n")
    file.write("relationship: #{relationship}\n")
    file.write("categories: newspaper gazette\n")
    file.write("---\n\n")
    file.write("#{content}")
    file.write()
  end
end 

