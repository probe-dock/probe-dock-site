---
layout: post
title: "An Angular Fullstack-like structure with Ruby on Rails"
categories: howto
date: 2016-02-06 14:00:00
media_folder: /media/angular-fullstack-like-structure-with-rails
---

```ruby
class HomeController < ApplicationController
  append_view_path Rails.root.join('client')

  def template

    # only accept html templates
    return render_template_not_found unless params[:format] == 'html'

    # only accept alphanumeric characters, hyphens and underscores, separated by slashes
    return render_template_not_found unless params[:template].to_s.match /\A[a-z0-9\.\-\_]+(\/[a-z0-9\.\-\_]+)*\Z/i

    if params[:template].to_s.match /^modules\//
      begin
        return render template: params[:template].to_s, layout: false
      rescue ActionView::MissingTemplate
        return render_template_not_found
      end
    end

    begin
      render template: "templates/#{params[:template]}", layout: false
    rescue ActionView::MissingTemplate
      render_template_not_found
    end
  end

  private

  def render_template_not_found
    render text: 'Template not found', status: :not_found
  end
end
```

```ruby
Rails.application.routes.draw do
  # other routes...

  if %w(development test).include? Rails.env
    mount Resque::Server.new, at: '/resque'
    get '/templates/*template', to: 'home#template'
  end

  get '/*path', to: 'home#index'
  root 'home#index'
end
```

```ruby
module Lair
  class Application < Rails::Application
    config.assets.paths << Rails.root.join('client')
  end
end
```

```ruby
namespace :templates do

  desc 'Compile all templates in client to public/templates'
  task precompile: :environment do
    templates_dir = Rails.root.join 'client'

    Dir.chdir templates_dir
    templates = Dir.glob('**/*.slim').reject{ |t| t.match /^(?:\.|_)/ }

    target_dir = Rails.root.join 'public', 'templates'
    FileUtils.mkdir_p target_dir

    templates.each do |template|
      source = File.join templates_dir, template
      target = File.join target_dir, template.sub(/\.slim$/, '')

      scope = Object.new
      options = {}
      rendered = Slim::Template.new(source, options).render(scope)

      FileUtils.mkdir_p File.dirname(target)
      File.open(target, 'w'){ |f| f.write rendered }

      puts "#{Pathname.new(source).relative_path_from Rails.root} -> #{Pathname.new(target).relative_path_from Rails.root}"
    end
  end
end
```
