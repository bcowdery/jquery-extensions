require 'rake'
require 'rake/packagetask'

PROJECT_NAME     = 'compatability'
PROJECT_ROOT     = File.expand_path(File.dirname(__FILE__))
PROJECT_SRC_DIR  = File.join(PROJECT_ROOT, 'src')
PROJECT_DIST_DIR = File.join(PROJECT_ROOT, 'dist')
PROJECT_PKG_DIR  = File.join(PROJECT_ROOT, 'pkg')
PROJECT_VERSION  = '0.0.0.1'

task :default => [:dist, :package, :clean_package_source]

namespace :prototype do
  Dir.chdir('prototype') do    
    load 'Rakefile'
  end
end

desc "Builds the distribution"
task :dist do 
  Rake::Task['prototype:dist'].invoke
  
  $:.unshift File.join(PROTOTYPE_ROOT, 'lib')
  require 'protodoc'  
  
  Dir.chdir(PROJECT_SRC_DIR) do
    File.open(File.join(PROJECT_DIST_DIR, "#{PROJECT_NAME}.js"), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new("#{PROJECT_NAME}.js")
    end
  end
end

Rake::PackageTask.new(PROJECT_NAME, PROJECT_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = PROJECT_PKG_DIR
  package.package_files.include(
    "[A-Z]*",
    "dist/#{PROJECT_NAME}",
    "lib/**",
    "src/**",
    "test/**",
    "prototype/dist/prototype.js"
  )
end

task :clean_package_source do
  rm_rf File.join(PROJECT_PKG_DIR, "#{PROJECT_NAME}-#{PROJECT_VERSION}")
end
