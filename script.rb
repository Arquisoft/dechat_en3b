require "asciidoctor"

puts "Converting to html..."
docs = Dir["src/docs/*.adoc"]
docs.each { 
	|doc| Asciidoctor.convert_file doc, to_dir: "docs"
	puts "Converting " << doc 
}

puts "Done"