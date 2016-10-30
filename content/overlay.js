/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.PHPTags) === 'undefined') extensions.PHPTags = {
	version: '1.0'
};

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.PHPTags."),
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

		// Basic PHP Tags <?
		if (e.shiftKey && e.which == 191 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language,
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						if (scimoz.currentPos > 0 && scimoz.getWCharAt(scimoz.currentPos - 1).toString() === '<') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							if (useShortTags === 'yes') {
								scimoz.insertText(scimoz.currentPos, '?  ?>');
								scimoz.gotoPos(scimoz.currentPos + 2);
							} else {
								scimoz.insertText(scimoz.currentPos, '?php  ?>');
								scimoz.gotoPos(scimoz.currentPos + 5);
							}
						} else {
							scimoz.insertText(scimoz.currentPos, '?');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}

						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// Basic echo Tags <?php echo
		if (!e.shiftKey && e.which == 67 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language,
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<e') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							if (useShortTags === 'yes') {
								scimoz.insertText(scimoz.currentPos, '?= ?>');
								scimoz.gotoPos(scimoz.currentPos + 3);
							} else {
								scimoz.insertText(scimoz.currentPos, '?php echo  ?>');
								scimoz.gotoPos(scimoz.currentPos + 10);
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'c');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}

						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// IF Statement <if
		if (!e.shiftKey && e.which == 70 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language,
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						currentView.scimoz.beginUndoAction();

						if (testString && testString === '<i') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('if_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('if', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'f');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// Else Tag <el / If Esle Statement <il
		if (!e.shiftKey && e.which == 76 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language,
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<e') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('else_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('else', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else if (testString && testString === '<i') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('ifelse_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('ifelse', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'l');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// Foreach <fo
		if (!e.shiftKey && e.which == 79 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<f') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('foreach_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('foreach', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'o');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// switch <sw
		if (!e.shiftKey && e.which == 87 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<s') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('switch_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('switch', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'w');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// case <ca
		if (!e.shiftKey && e.which == 65 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<c') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('case_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('case', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'w');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// print <pr
		if (!e.shiftKey && e.which == 82 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language
				useShortTags = prefs.getCharPref('shorttags');

			if (scimoz.selText.length > 0) {
				return false;
			}

			switch (language) {
				case 'PHP':

					try {
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();

						currentView.scimoz.beginUndoAction();

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<p') {
							if (currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('print_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('print', 'HTML', 'HTML');
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else {
							scimoz.insertText(scimoz.currentPos, 'r');
							scimoz.gotoPos(scimoz.currentPos + 1);
						}
						currentView.scimoz.endUndoAction();

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
	}
	
	this.openDialog = function(){
		data = {
			self: self,
			ko: ko,
		}
		window.openDialog("chrome://PHPTags/content/getSnippets.xul","downloadSnippets",
					"chrome",data);
	}
	
	this.openSnippetsPage = function(){
		ko.browse.openUrlInDefaultBrowser('https://github.com/babobski/PHP-Tatgs-Snippets');
	}

	editor_pane.addEventListener('keydown', self._autoCompleteTag, true);

}).apply(extensions.PHPTags);
