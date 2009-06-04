require 'rake'
require 'rake/packagetask'

require 'yaml'

PROJECT_ROOT          = File.expand_path(File.dirname(__FILE__))
PROJECT_SRC_DIR       = File.join(PROJECT_ROOT, 'src')
PROJECT_DIST_DIR      = File.join(PROJECT_ROOT, 'dist')
PROJECT_PKG_DIR       = File.join(PROJECT_ROOT, 'pkg')
PROJECT_TEST_DIR      = File.join(PROJECT_ROOT, 'test')
PROJECT_TEST_UNIT_DIR = File.join(PROJECT_TEST_DIR, 'unit')
PROJECT_TMP_DIR       = File.join(PROJECT_TEST_UNIT_DIR, 'tmp')
PROJECT_VERSION  = YAML.load(IO.read(File.join(PROJECT_SRC_DIR, 'constants.yml')))['PROJECT_VERSION']

$:.unshift File.join('prototype', 'vendor', 'sprockets', 'lib')

task :default => [:dist, :package, :clean_package_source]

def compile(path, source, destination = source)
  begin
    require "sprockets"
  rescue LoadError => e
    puts "\nYou'll need Sprockets to build Prototype. Just run:\n\n"
    puts "  $ cd prototype"
    puts "  $ git submodule init"
    puts "  $ git submodule update"
    puts "\nand you should be all set.\n\n"
  end
  
  secretary = Sprockets::Secretary.new(
    :root         => File.join(PROJECT_ROOT, path),
    :load_path    => [PROJECT_SRC_DIR],
    :source_files => [source]
  )
  
  secretary.concatenation.save_to(File.join(PROJECT_DIST_DIR, destination))
end

desc "Builds the distribution"
task :dist => ['dist:extensions']

namespace :dist do   
  task :extensions do 
    compile("src", "extensions.js")
  end
  
  task :prototype => [:require] do
    namespace :prototype do
      Dir.chdir('prototype') do    
        load 'Rakefile'
      end
    end
    
    Rake::Task['prototype:dist'].invoke
  end
  
  task :require do
    prototype_src = 'prototype'
    unless File.exists?(prototype_src)
       puts "\nYou'll need the Prototype source to build and run tests\n\n"
       puts "  $ git clone git://github.com/sstephenson/prototype.git prototype"
       puts "\nand you should be good to go.\n\n"
   end
  end
end

Rake::PackageTask.new('extensions', PROJECT_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = PROJECT_PKG_DIR
  package.package_files.include(
    '[A-Z]*',
    'prototype/dist/prototype.js',
    'dist/extensions.js',
    'lib/**',
    'src/**',
    'test/**'
  )
end

task :clean_package_source do
  rm_rf File.join(PROJECT_PKG_DIR, "extensions-#{PROJECT_VERSION}")
end

desc "Runs all tests and collects the results"
task :test => ['test:build', 'test:run']

namespace :test do
  task :run => [:require] do
    testcases        = ENV['TESTCASES']
    browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
    tests_to_run     = ENV['TESTS'] && ENV['TESTS'].split(',')
    runner           = UnittestJS::WEBrickRunner::Runner.new(:test_dir => PROJECT_TMP_DIR)

    Dir[File.join(PROJECT_TMP_DIR, '*_test.html')].each do |file|
      file = File.basename(file)           
      test = file.sub('_test.html', '')
      unless tests_to_run && !tests_to_run.include?(test)
        runner.add_test(file, testcases)
      end
    end
    
    UnittestJS::Browser::SUPPORTED.each do |browser|
      unless browsers_to_test && !browsers_to_test.include?(browser)
        runner.add_browser(browser.to_sym)
      end
    end
    
    trap('INT') { runner.teardown; exit }
    runner.run
  end
  
  task :build => [:clean, :dist] do
    builder = UnittestJS::Builder::SuiteBuilder.new({
      :input_dir  => PROJECT_TEST_UNIT_DIR,
      :assets_dir => PROJECT_DIST_DIR
    })
    selected_tests = (ENV['TESTS'] || '').split(',')
    builder.collect(*selected_tests)
    builder.render
  end
  
  task :clean => [:require] do
    UnittestJS::Builder.empty_dir!(PROJECT_TMP_DIR)
  end
  
  task :require do
    lib = 'prototype/vendor/unittest_js/lib/unittest_js'
    unless File.exists?(lib)
      puts "\nYou'll need UnittestJS to run the tests. Just run:\n\n"
      puts "  $ cd prototype"
      puts "  $ git submodule init"
      puts "  $ git submodule update"
      puts "\nand you should be all set.\n\n"
    end
    require lib
  end
end

namespace :caja do
  task :test => ['test:build', 'test:run']
  
  namespace :test do
    task :run => ['rake:test:run']

    task :build => [:require, 'rake:test:clean', :dist] do 
      builder = UnittestJS::CajaBuilder::SuiteBuilder.new({
        :input_dir          => PROJECT_TEST_UNIT_DIR,
        :assets_dir         => PROJECT_DIST_DIR
      })
      selected_tests = (ENV['TESTS'] || '').split(',')
      builder.collect(*selected_tests)
      builder.render
    end
  end
  task :require => ['rake:test:require'] do
    lib = 'prototype/vendor/caja_builder/lib/caja_builder'
    unless File.exists?(lib)
      puts "\nYou'll need UnittestJS to run the tests. Just run:\n\n"
      puts "  $ cd prototype"
      puts "  $ git submodule init"
      puts "  $ git submodule update"
      puts "\nand you should be all set.\n\n"
    end
    require lib
  end
end