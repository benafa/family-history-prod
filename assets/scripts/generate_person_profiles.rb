require 'csv'

# run this file in the terminal using the "ruby" command

csv_file = File.read('/Users/benanandappa/Documents/git_repos/family-history/docs/_data/individuals.csv')
csv_data = CSV.parse(csv_file, headers: true)

list_delimiter = ';'

csv_data.each do |row|
  # Define variables for the post data
  person_id = row['person_id']
  person_last_name = row['person_last_name']
  person_first_name = row['person_first_name']
  person_full_name = row['person_full_name']
  
  mother_id = row['mother_id']
  mother_name = row['mother_name']

  father_id = row["father_id"]
  father_name = row["father_name"]

  if row["children_ids"]
    children_ids = row["children_ids"].split(list_delimiter).map(&:strip)
  else
    children_ids = []
  end

  if row["children_names"]
    children_names = row["children_names"].split(list_delimiter).map(&:strip)
  else
    children_names = []
  end

  if row["partner_ids"]
    partner_ids = row["partner_ids"].split(list_delimiter).map(&:strip)
  else
    partner_ids = []
  end

  if row["partner_names"]
    partner_names = row["partner_names"].split(list_delimiter).map(&:strip)
  else
    partner_names = []
  end


  sex = row["sex"]

  title = "Profile of " + person_full_name
  
  # Define the Jekyll post file name based on the date and title
  post_name = "#{person_id}.md"
  
  # Create the Jekyll post file and populate it with the data
  File.open("/Users/benanandappa/Documents/git_repos/family-history/docs/_person/#{post_name}", "w") do |file|
    file.write("---\n")
    file.write("layout: person\n")
    file.write("title: #{title}\n")

    file.write("person_id: #{person_id}\n")
    file.write("first_name: #{person_first_name}\n")
    file.write("last_name: #{person_last_name}\n")
    file.write("full_name: #{person_full_name}\n")

    file.write("mother: #{mother_name}\n")    
    file.write("mother_id: #{mother_id}\n")

    file.write("father: #{father_name}\n")
    file.write("father_id: #{father_id}\n")
    
    file.write("children:\n")
    children_names.each_with_index do |child, index|
      file.write(" - #{child}\n")
    end
    file.write("children_ids:\n")
    children_ids.each_with_index do |child, index|
      file.write(" - #{child}\n")
    end

    file.write("partners:\n")
    partner_names.each_with_index do |partner, index|
      file.write(" - #{partner}\n")
    end
    file.write("partner_ids:\n")
    partner_ids.each_with_index do |partner, index|
      file.write(" - #{partner}\n")
    end

    file.write("sex: #{sex}\n")
    file.write("---\n\n")
    file.write()
  end
end 

