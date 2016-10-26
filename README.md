# PHP-Tags
PHP tag autocompletion

## Autocompletions
This addon will provide auto completion for common php tags.  
Also is there support for short-tags, this can be ebabled trough the settings.

### PHP tag
```php
<?

// Will expand to
<?php[Tabstop] ?>
```

### If tags
```php
<if

// Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php endif; ?>
```

### If else tags
```php
<el

// Will expand to
<?php if([Tabstop]): ?>
	// [Tabstop]
<?php else: ?>
	// [Tabstop]
<?php endif; ?>
```

### Foreach tags
```php
<fo

// Will expand to
<?php foreach([Tabstop:$pages] as [Tabstop:$page]): ?>
	// [Tabstop]
<?php endforeach; ?>
```
