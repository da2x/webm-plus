all: dist

extension = config.xml index.html options.html \
            includes/*.js scripts/*.js \
            gfx/*.css gfx/*.png icon.png \
            COPYING \
            locales/*/*/*.js

sysexcludes = '.DS_Store' '__MACOSX' \
              'Thumbs.db' 'desktop.ini'

webm-plus.oex: $(extension)
	zip -9r ./webm-plus.oex . -i $(extension) -x $(sysexcludes)

gettext-from-js: includes/webm-plus-extension.js scripts/options.js locales/source_jstrings.po
	xgettext.pl includes/webm-plus-extension.js scripts/options.js -o locales/source_jstrings.po

update-translations: locales/*/jstrings.po
	@hash gettext-makejs2.pl 2>&- || { echo >&2 "I require gettext-makejs2.pl but it's not installed. Now aborting. See https://github.com/zcode/gettext-makejs2"; exit 1; }
	(cd locales/ && export GETTEXT_MAKEJS2_SUFFIX=".i18n" && export GETTEXT_MAKEJS2_NAME="oexi18n" && gettext-makejs2.pl */jstrings.po)

dist: update-translations webm-plus.oex

clean:
	rm -f ./webm-plus.oex
