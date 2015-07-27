require 'rake'
require 'tmpdir'
require 'jekyll'
require 'paint'
require 'shellwords'

desc 'Update GitHub pages (compile site in "source" branch and commit to "master")'
task :pages do |t|

  source = File.expand_path File.dirname(__FILE__)
  remote = 'git@github.com:probedock/probedock.github.io.git'

  Dir.chdir source
  current_branch = `git symbolic-ref --short HEAD`
  current_hash = `git log --pretty=format:'%h' -n 1`

  puts Paint["\nCreating temporary repo...", :yellow]

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
      'source'      => source,
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

    puts Paint["\nAll good!\n", :bold, :green]
  end
end
