require 'dotenv'
require 'fileutils'
require 'jekyll'
require 'launchy'
require 'paint'
require 'rake'
require 'rbconfig'
require 's3_uploader'
require 'shellwords'
require 'tmpdir'
require 'yaml'

Dotenv.load

desc 'Update staging version on Amazon S3 (with drafts)'
task :staging, :with_drafts, :open_browser do |t,args|
  args.with_defaults with_drafts: true, open_browser: true
  with_drafts = !!args[:with_drafts].to_s.match(/\Atrue\Z/i)
  open_browser = !!args[:open_browser].to_s.match(/\Atrue\Z/i)

  source = File.expand_path File.dirname(__FILE__)

  puts Paint["\nCreating temporary directory...", :yellow]

  # create a temporary directory
  Dir.mktmpdir do |tmp|

    # generate jekyll site into temporary directory
    puts Paint["\nGenerating site...\n", :yellow]

    Dir.chdir source
    conf = Jekyll.configuration({
      'source' => source,
      'destination' => tmp,
      'show_drafts' => with_drafts
    })

    Jekyll::Site.new(conf).process

    unless ENV['S3_KEY'] && ENV['S3_SECRET']
      raise "The $S3_KEY and $S3_SECRET environment variables must be set to upload to Amazon S3"
    end

    # upload to s3
    puts Paint["\nUploading to Amazon S3...\n", :yellow]

    Dir.chdir tmp
    S3Uploader.upload_directory(tmp, 'probedock-blog-staging', {
      region: 'eu-central-1',
      threads: 4
    })

    url = 'http://probedock-blog-staging.s3-website.eu-central-1.amazonaws.com/'

    puts
    puts Paint["All good!", :bold, :green]
    puts
    puts url
    puts

    Launchy.open url if open_browser
  end
end

desc 'Update GitHub pages (compile site in "source" branch and commit to "master")'
task :pages, :open_browser do |t,args|
  args.with_defaults open_browser: true
  open_browser = !!args[:open_browser].to_s.match(/\Atrue\Z/i)

  source = File.expand_path File.dirname(__FILE__)
  remote = 'git@github.com:probedock/probedock.github.io.git'

  Dir.chdir source
  current_branch = `git symbolic-ref --short HEAD`
  current_hash = `git log --pretty=format:'%h' -n 1`

  puts Paint["\nCreating temporary repo...", :yellow]
  puts Paint[Dir.tmpdir, :red]

  # create a temporary directory
  Dir.mktmpdir do |tmp|

    # initialize a new repo
    Dir.chdir tmp
    raise 'ERROR: could not initialize repo' unless system "git init &>/dev/null"

    # pull latest changes from local master (fast)
    raise 'ERROR: could not add local remote to repo' unless system "git remote add local file://#{Shellwords.shellescape source}"
    raise 'ERROR: could not pull local master branch' unless system "git pull local master &>/dev/null"

    # pull latest changes from remote master
    raise 'ERROR: could not add GitHub remote to repo' unless system "git remote add origin #{remote}"
    raise 'ERROR: could not pull master branch from GitHub' unless system "git pull origin master &>/dev/null"

    # generate jekyll site into temporary directory
    puts Paint["\nGenerating site...\n", :yellow]
    Dir.chdir source

    conf = Jekyll.configuration({
      'source' => source,
      'destination' => tmp
    })

    Jekyll::Site.new(conf).process

    # commit changes
    puts Paint["\nCommitting...\n", :yellow]
    Dir.chdir tmp
    raise 'ERROR: could not stage changes' unless system "git add -A"
    raise 'ERROR: could not stage changes' unless system "git ls-files --deleted -z | xargs -0 git rm"
    raise 'ERROR: could not commit changes' unless system %/git commit -m "Generated from #{current_branch}@#{current_hash}."/

    # push to remote master
    puts Paint["\nPushing...\n", :yellow]
    raise 'ERROR: could not push to master' unless system "git push origin master"

    url = 'http://probedock.io/'

    puts
    puts Paint["All good!", :bold, :green]
    puts
    puts url
    puts

    Launchy.open url if open_browser
  end
end

#############################################################
# From https://github.com/gummesson/jekyll-rake-boilerplate #
#############################################################

# Load the configuration file
CONFIG = YAML.load_file("_config.yml")

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")
TIME = Time.now.strftime("%H:%M:%S")
POST_TIME = DATE + ' ' + TIME

# Directories
POSTS = "_posts"
DRAFTS = "_drafts"

# Execute a system command
def execute(command)
  system "#{command}"
end

# Chech the title
def check_title(title)
  if title.nil? or title.empty?
    raise "Please add a title to your file."
  end
end

# Transform the filename and date to a slug
def transform_to_slug(title, extension)
  characters = /("|'|!|\?|:|\s\z)/
  whitespace = /\s/
  "#{title.gsub(characters,"").gsub(whitespace,"-").downcase}.#{extension}"
end

# Read the template file
def read_file(template)
  File.read(template)
end

# Save the file with the title in the YAML front matter
def write_file(content, title, directory, filename)
  parsed_content = "#{content.sub("title:", "title: \"#{title}\"")}"
  parsed_content = "#{parsed_content.sub("date:", "date: #{POST_TIME}")}"
  File.write("#{directory}/#{filename}", parsed_content)
  puts "#{filename} was created in '#{directory}'."
end

# Create the file with the slug and open the default editor
def create_file(directory, filename, content, title, editor)
  FileUtils.mkdir(directory) unless File.exists?(directory)
  if File.exists?("#{directory}/#{filename}")
    raise "The file already exists."
  else
    write_file(content, title, directory, filename)
    if editor && !editor.nil?
      sleep 1
      execute("#{editor} #{directory}/#{filename}")
    end
  end
end

# Get the "open" command
def open_command
  if RbConfig::CONFIG["host_os"] =~ /mswin|mingw/
    "start"
  elsif RbConfig::CONFIG["host_os"] =~ /darwin/
    "open"
  else
    "xdg-open"
  end
end

desc "Create a post in _posts"
task :post, :title do |t, args|
  title = args[:title]
  template = CONFIG["post"]["template"]
  extension = CONFIG["post"]["extension"]
  editor = CONFIG["editor"]
  check_title(title)
  filename = "#{DATE}-#{transform_to_slug(title, extension)}"
  content = read_file(template)
  create_file(POSTS, filename, content, title, editor)
end

# rake draft["Title"]
desc "Create a post in _drafts"
task :draft, :title do |t, args|
  title = args[:title]
  template = CONFIG["post"]["template"]
  extension = CONFIG["post"]["extension"]
  editor = CONFIG["editor"]
  check_title(title)
  filename = transform_to_slug(title, extension)
  content = read_file(template)
  create_file(DRAFTS, filename, content, title, editor)
end

# rake publish
desc "Move a post from _drafts to _posts"
task :publish do
  extension = CONFIG["post"]["extension"]
  files = Dir["#{DRAFTS}/*.#{extension}"]
  files.each_with_index do |file, index|
    puts "#{index + 1}: #{file}".sub("#{DRAFTS}/", "")
  end
  print "> "
  number = $stdin.gets
  if number =~ /\D/
    filename = files[number.to_i - 1].sub("#{DRAFTS}/", "")
    FileUtils.mv("#{DRAFTS}/#{filename}", "#{POSTS}/#{DATE}-#{filename}")
    puts "#{filename} was moved to '#{POSTS}'."
  else
    puts "Please choose a draft by the assigned number."
  end
end

# rake page["Title"]
# rake page["Title","Path/to/folder"]
desc "Create a page (optional filepath)"
task :page, :title, :path do |t, args|
  title = args[:title]
  template = CONFIG["page"]["template"]
  extension = CONFIG["page"]["extension"]
  editor = CONFIG["editor"]
  directory = args[:path]
  if directory.nil? or directory.empty?
    directory = "./"
  else
    FileUtils.mkdir_p("#{directory}")
  end
  check_title(title)
  filename = transform_to_slug(title, extension)
  content = read_file(template)
  create_file(directory, filename, content, title, editor)
end

# rake watch
# rake watch[number]
# rake watch["nodrafts"]
desc "Serve and watch the site (with post limit or drafts)"
task :watch, :option do |t, args|
  option = args[:option]
  if option.nil? or option.empty?
    execute("jekyll serve --watch --drafts")
  else
    if option == "nodrafts"
      execute("jekyll serve --watch")
    else
      execute("jekyll serve --watch --limit_posts #{option}")
    end
  end
end

# rake preview
desc "Launch a preview of the site in the browser"
task :preview do
  port = CONFIG["port"]
  if port.nil? or port.empty?
    port = 4000
  end
  Thread.new do
    sleep 3
    puts "Launching browser for preview..."
    execute("#{open_command} http://localhost:#{port}/")
  end
  Rake::Task[:watch].invoke
end
