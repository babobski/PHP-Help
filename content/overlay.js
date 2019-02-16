/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.STA) === 'undefined') extensions.STA = {
	version: '1.1'
};

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.STA."),
		editor_pane = ko.views.manager.topView;
	

	editor_pane.removeEventListener('keydown', self._autoCompleteTag, true);

	this._autoCompleteTag = function(e) {
		var currentView = ko.views.manager.currentView;

		if (!currentView) {
			return false;
		}

		var scimoz = currentView.scimoz;

		if ( !scimoz || ! scimoz.focus || scimoz.selText.length > 0 || scimoz.selections > 1) {
			return false;
		}
		
		if (ko.keybindings.manager.inPrefixCapture) {
			return false;
		}
		
		var  koDoc = currentView.document || currentView.koDoc,
				language = koDoc.language,
				subLanguage = koDoc.subLanguage,
				useShortTags = prefs.getCharPref('shorttags');

		// Basic PHP Tags <?
		if (e.shiftKey && e.which == 191 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useBasic = prefs.getBoolPref('tag_basic');
			
			if (!useBasic) {
				return;
			}
			
			switch (language) {
				case 'PHP':

					try {

						if (scimoz.currentPos > 0 && scimoz.getWCharAt(scimoz.currentPos - 1).toString() === '<') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							currentView.scimoz.beginUndoAction();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							if (useShortTags === 'yes') {
								scimoz.insertText(scimoz.currentPos, '?  ?>');
								scimoz.gotoPos(scimoz.currentPos + 2);
							} else {
								scimoz.insertText(scimoz.currentPos, '?php  ?>');
								scimoz.gotoPos(scimoz.currentPos + 5);
							}
							currentView.scimoz.endUndoAction();
						} 

						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// Basic echo Tags <?php echo
		if (!e.shiftKey && e.which == 67 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useEcho = prefs.getBoolPref('tag_echo');
			
			if (!useEcho) {
				return;
			}
			
			switch (language) {
				case 'PHP':

					try {
						
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<e') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							if (useShortTags === 'yes') {
								scimoz.insertText(scimoz.currentPos, '?=  ?>');
								scimoz.gotoPos(scimoz.currentPos + 3);
							} else {
								scimoz.insertText(scimoz.currentPos, '?php echo  ?>');
								scimoz.gotoPos(scimoz.currentPos + 10);
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// IF Statement <if
		if (!e.shiftKey && e.which == 70 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useIf = prefs.getBoolPref('tag_if');
			
			if (!useIf) {
				return;
			}
			
			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<i') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('if_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('if', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('if', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('if', 'JavaScript', 'JavaScript');
									break;
							}
							 
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// Else if Statement <ei
		if (!e.shiftKey && e.which == 73 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useElseif = prefs.getBoolPref('tag_elseif');
			
			if (!useElseif) {
				return;
			}

			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {
						
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<e') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('elseif_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('elseif', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('elseif', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('elseif', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// Else Tag <el / If Esle Statement <il
		if (!e.shiftKey && e.which == 76 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			
			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {

						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<e') {
							var useElse = prefs.getBoolPref('tag_else');
			
							if (!useElse) {
								return;
							}
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('else_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('else', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('else', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('else', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						} else if (testString && testString === '<i') {
							var useIfelse = prefs.getBoolPref('tag_ifelse');
			
							if (!useIfelse) {
								return;
							}
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('ifelse_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('ifelse', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('ifelse', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('ifelse', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}

		// Foreach <fo
		if (!e.shiftKey && e.which == 79 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useFor = prefs.getBoolPref('tag_for');
			
			if (!useFor) {
				return;
			}

			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {
						
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<f') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('foreach_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('foreach', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('foreach', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('foreach', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// switch <sw
		if (!e.shiftKey && e.which == 87 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useSwitch = prefs.getBoolPref('tag_switch');
			
			if (!useSwitch) {
				return;
			}
			
			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {
					
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<s') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('switch_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('switch', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('switch', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('switch', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// case <ca
		if (!e.shiftKey && e.which == 65 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var useCase = prefs.getBoolPref('tag_case');
			
			if (!useCase) {
				return;
			}
			
			switch (language) {
				case 'PHP':
				case 'JavaScript':

					try {
						
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;
						
						if (testString && testString === '<c') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							var snippet;
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('case_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('case', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('case', 'PHP', 'PHP');
									break;
								case 'JavaScript':
									snippet = ko.abbrev.findAbbrevSnippet('case', 'JavaScript', 'JavaScript');
									break;
							}
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

					} catch (e) {
						alert(e);
					}
					break;
			}
		}
		
		// print <pr
		if (!e.shiftKey && e.which == 82 && !e.ctrlKey && !e.altKey && !e.metaKey) {
			var usePrint = prefs.getBoolPref('tag_print');
			
			if (!usePrint) {
				return;
			}

			switch (language) {
				case 'PHP':

					try {
						
						var testString = scimoz.currentPos > 1 ? scimoz.getTextRange((scimoz.currentPos - 2), scimoz.currentPos) : false;

						if (testString && testString === '<p') {
							e.preventDefault();
							e.stopPropagation();
							e.stopImmediatePropagation();
							
							var snippet = null;
							
							if (currentView.scintilla.autocomplete && currentView.scintilla.autocomplete.active) {
								currentView.scintilla.autocomplete.close();
							}
							
							scimoz.deleteBackNotLine();
							scimoz.deleteBackNotLine();
							
							switch (subLanguage) {
								case 'HTML':
								case 'HTML5':
									snippet = useShortTags === 'yes' ? ko.abbrev.findAbbrevSnippet('print_short', 'HTML', 'HTML') : ko.abbrev.findAbbrevSnippet('print', 'HTML', 'HTML');
									break;
								case 'PHP':
									snippet = ko.abbrev.findAbbrevSnippet('print', 'PHP', 'PHP');
									break;
							}
							 
							if (snippet !== null) {
								ko.abbrev.insertAbbrevSnippet(snippet);
							} else {
								self.openDialog();
							}
						}
						
						return false;

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
		window.openDialog("chrome://STA/content/getSnippets.xul","downloadSnippets",
					"chrome,centerscreen,modal",data);
	}
	
	this.openSnippetsPage = function(){
		ko.browse.openUrlInDefaultBrowser('https://github.com/babobski/PHP-Tatgs-Snippets');
	}

	editor_pane.addEventListener('keydown', self._autoCompleteTag, true);

}).apply(extensions.STA);
