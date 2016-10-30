# PHP-Tags
PHP tag autocompletion

## Installation
 * Installing required snippets
 * Installing addon
 * Configure Short Tags (optional)

**Installing required snippets**  
For the autocompletion to work, you need to install snippets. 
You can adjust the snippets to needs (Indentation, etc.).  
The snippets can be found [here](https://github.com/babobski/PHP-Tags-Snippets).

## Autocompletions
This addon will provide auto completion for common php tags.  
Also is there support for short-tags, this can be enabled trough the settings.

### PHP tag
To insert a default php tag, type `<?` and the following snippet will be inserted:

```php
// <? Will expand to
<?php [Tabstop] ?>
```
![preview](php-tag.gif)

### echo tag
To instert a echo php tag, type `<ec` and the following snippet will be inserted:
```php
// <ec Will expand to
<?php echo [Tabstop] ?>
```
![preview](echo-tag.gif)

### If tags
To insert a if tag, type `<if` and the following snippet will be inserted:
```php
// <if Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php endif; ?>
```
![preview](if-tag.gif)

### else tags
To insert a else tag, type `<el` and the following snippet will be inserted:
```php
// <el Will expand to
<?php else: ?>
```
![preview](esle-tag.gif)

### If else tags
To insert a if-else tag, type `<il` and the following snippet will be inserted:
```php
// <il Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php else: ?>
	// [Tabstop]
<?php endif; ?>
```
![preview](if-else-tag.gif)

### Foreach tags
To insert a foreach tag, type `<fo` and the following snippet will be inserted:
```php
// <fo Will expand to
<?php foreach([Tabstop:$pages] as [Tabstop:$page]): ?>
	// [Tabstop]
<?php endforeach; ?>
```
![preview](foreach-tag.gif)

### Switch tags
To insert a switch tag, type `<sw` and the following snippet will be inserted:
```php
// <sw Will expand to
<?php switch([tabstop]:$value):
	case '[tabstop]': ?>
		// [tabstop]
	<?php break; ?>
<?php endswitch; ?>
```
![preview](switch-tag.gif)

### Case tags
To insert a case tag, type `<ca` and the following snippet will be inserted:
```php
// <ca Will expand to
<?php case '[tabstop]': ?>
	[tabstop]
<?php break; ?>
```
![preview](case-tag.gif)

### Print tag 
To insert a print tag, type `<pr` and the following snippet will be inserted:
```php
// <pr Will expand to
<?php echo '<pre>' . print_r([tabstop], true) . '</pre>'; ?>
```
![preview](print-tag.gif)
