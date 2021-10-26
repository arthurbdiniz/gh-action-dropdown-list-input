package-chrome:
	cd chrome && zip -r -FS ../gh-action-dropdown-chrome.zip * && cd ..

package-firefox:
	cd firefox && zip -r -FS ../gh-action-dropdown-firefox.zip * && cd ..