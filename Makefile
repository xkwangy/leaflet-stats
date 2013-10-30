all: leaflet-stats.js site/dist.js

site/dist.js: index.js site/index.js
	browserify site/index.js > site/dist.js

leaflet-stats.js: index.js
	browserify -s leafletStats index.js > leaflet-stats.js
