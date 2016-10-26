# PHP-Tags
PHP tag autocompletion

## Autocompletions
This addon will provide auto completion for common php tags.  
Also is there support for short-tags, this can be ebabled trough the settings.

### PHP tag
```
<?

// Will expand to
<?php[Tabstop] ?>

### If tags
```
<if

// Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php endif; ?>
```

### If else tags
```
<el

// Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php else: ?>
	// [Tabstop]
<?php endif; ?>
```

### Foreach tags
```
<fo

// Will expand to
<?php foreach([Tabstop:$pages] as [Tabstop:$page]): ?>
	// [Tabstop]
<?php endforeach; ?>
```
