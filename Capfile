require "capistrano/setup"
require "capistrano/deploy"
require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }

# （追加）　https://tackeyy.com/blog/posts/fix-capistrano-deprecation-notice-after-capistrano-version-up
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git