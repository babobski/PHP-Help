/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.PHPHelp) === 'undefined') extensions.PHPHelp = { version : '1.0' };

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.PHPHelp."),
		editor_pane = ko.views.manager.topView;
		
	editor_pane.removeEventListener('keydown', self._autoCompleteTag, true);
		
	this._autoCompleteTag = function(e) {
		var currentView = ko.views.manager.currentView;
		
		if (!currentView) {
			return false;
		}
		
		var scimoz = currentView.scimoz;
		
		if (!scimoz) {
			return false
		}
		
		if (e.shiftKey && e.which == 191) {
			var koDoc = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc,
				language = koDoc.language,
				useShortTags = prefs.getCharPref('shorttags');
			
			switch (language) {
				case 'PHP':
				case 'HTML':
				case 'HTML5':
					
					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						
						if (scimoz.getWCharAt(scimoz.currentPos - 1).toString() === '<') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							if (useShortTags === 'yes') {
								scimoz.insertText(scimoz.currentPos, '? ?>');
								scimoz.gotoPos(scimoz.currentPos + 1);
							} else {
								scimoz.insertText(scimoz.currentPos, '?php ?>');
								scimoz.gotoPos(scimoz.currentPos + 4);
							}
						} else {
							scimoz.insertText(scimoz.currentPos, '?');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						
					} catch(e) {
						alert(e);
					}
					break;
			}
		}
		
		if (e.shiftKey === false && e.which == 70) {
			var koDoc = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc,
			language = koDoc.language;
			
			switch (language) {
				case 'PHP':
				case 'HTML':
				case 'HTML5':
					
					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						
						var testString = scimoz. getTextRange((scimoz.currentPos - 2), scimoz.currentPos);
						
						if (testString === '<i') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = ko.abbrev.findAbbrevSnippet('if', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								alert('Snippet "if" not found');
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'f');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						
					} catch(e) {
						alert(e);
					}
					break;
			}
		}
		
		if (e.shiftKey === false && e.which == 76) {
			var koDoc = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc,
			language = koDoc.language;
			
			switch (language) {
				case 'PHP':
				case 'HTML':
				case 'HTML5':
					
					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						
						var testString = scimoz. getTextRange((scimoz.currentPos - 2), scimoz.currentPos);
						
						if (testString === '<e') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = ko.abbrev.findAbbrevSnippet('ifelse', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								alert('Snippet "if else" not found');
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'l');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						
					} catch(e) {
						alert(e);
					}
					break;
			}
		}
		
		if (e.shiftKey === false && e.which == 79) {
			var koDoc = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc,
			language = koDoc.language;
			
			switch (language) {
				case 'PHP':
				case 'HTML':
				case 'HTML5':
					
					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
						
						var testString = scimoz. getTextRange((scimoz.currentPos - 2), scimoz.currentPos);
						
						if (testString === '<f') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = ko.abbrev.findAbbrevSnippet('foreach', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								alert('Snippet "foreach" not found');
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'o');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						
					} catch(e) {
						alert(e);
					}
					break;
			}
		}
	}
	
	
	editor_pane.addEventListener('keydown', self._autoCompleteTag, true);
	
}).apply(extensions.PHPHelp);

