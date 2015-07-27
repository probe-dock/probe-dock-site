require 'rake'
require 'tmpdir'
require 'jekyll'
require 'shellwords'

desc 'Update GitHub pages (compile site in "source" branch and commit to "master")'
task :pages do |t|

  source = File.expand_path File.dirname(__FILE__)
  remote = 'git@github.com:probedock/probedock.github.io.git'

  Dir.chdir source
  current_hash = `git log --pretty=format:'%h' -n 1`

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
    Dir.chdir source

    conf = Jekyll.configuration({
      'source'      => source,
      'destination' => tmp
    })

    Jekyll::Site.new(conf).process

    # commit changes
    Dir.chdir tmp
    raise 'ERROR: could not stage changes' unless system "git add -A"
    raise 'ERROR: could not stage changes' unless system "git ls-files --deleted -z | xargs -0 git rm"
    raise 'ERROR: could not commit changes' unless system %/git commit -m "Generated from master@#{current_hash}."/

    # push to remote master
    raise 'ERROR: could not push to master' unless system "git push origin master"

    puts Paint['All good!', :bold, :green]
  end

=begin

    demo = File.join tmp, 'demo'
    Dir.mkdir demo
    raise 'ERROR: could not copy demo' unless system "cd #{repo}/docs/demo && cp -R * #{demo}"

    docs = File.join tmp, 'docs'
    Dir.mkdir docs
    bin = 'docco-central'
    raise 'ERROR: could not generate annotated source' unless system "cd #{repo} && docker -o #{docs} -I --exclude docs,lib,node_modules,vendor,wiki"
    raise 'ERROR: could not copy index page' unless system "cp res/index.html #{docs}"

    raise 'ERROR: could not checkout gh-pages' unless system "cd #{repo} && git checkout -b gh-pages origin/gh-pages"
    raise 'ERROR: could not clean gh-pages' unless system "cd #{repo} && rm -fr *"
    raise 'ERROR: could not create directories' unless system "cd #{repo} && mkdir annotated && mkdir demo"
    raise 'ERROR: could not copy docs' unless system "cd #{tmp} && cp -R #{docs}/* #{repo}/annotated"
    raise 'ERROR: could not copy demo' unless system "cd #{tmp} && cp -R #{demo}/* #{repo}/demo"
    raise 'ERROR: could not stage changes' unless system "cd #{repo} && git add -A"
    raise 'ERROR: could not stage changes' unless system "cd #{repo} && git ls-files --deleted -z | xargs -0 git rm"

    h = `cd #{repo} && git log --pretty=format:'%h' -n 1`
    raise 'ERROR: could not commit changes' unless system %/cd #{repo} && git commit -m "Generated from master@#{h}."/
    raise 'ERROR: could not push changes' unless system "cd #{repo} && git push"
  end
=end
end
