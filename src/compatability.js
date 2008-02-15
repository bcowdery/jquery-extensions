<%= include 'HEADER' %>

var Compatability = {
	version: '<%= PROJECT_VERSION %>',
	build_date: '<%= Time.now %>'	
}

<%= include 'base.js', 'string.js' %>

<%= include 'array.js', 'date.js' %>

<%= include 'input.js' %>
