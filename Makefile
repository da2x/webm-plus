all: dist

extension = config.xml index.html options.html \
            includes/*.js scripts/*.js \
            gfx/*.css gfx/*.png icon.png \
            LICENSE \
            locales/*/*/*.js

sysexcludes = '.DS_Store' '__MACOSX' \
              'Thumbs.db' 'desktop.ini'

webm-plus.oex: $(extension)
	zip -9r ./webm-plus.oex . -i $(extension) -x $(sysexcludes)

dist: webm-plus.oex

clean:
	rm -f ./webm-plus.oex
