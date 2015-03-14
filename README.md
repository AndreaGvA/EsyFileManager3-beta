###EsyFileManager 3.0.1 - beta
___
jQuery Ajax DOM File Manager

Working example in build/index.html

Usage:

```
$(".inputSelector").esyFileManger(options);

```

Options:

```
options={
	debug: true,
  	prefix:"fm-",
  	endpoint:'endpoint.php',
  	mode: "input",
  	size: true,
  	width: 300,
  	height: 400,
  	files: {
  		dir:"uploads/",
  		replace:""
  	},
  	del: {
  		allowDelete: true,
  		txtOnDelete: 'Sei sicuro di voler eliminare i files selezionati'
  	}
}

```

ToDo's:

```
1. Notification Area
2. Enable/Disable Notifications
3. Info area
4. TinyMce Integration
5. FilesTree (Handle Directories) Mode
6. PHP connector for db Usage

```

Build:

```
npm install
bower install
grunt
grunt min

```
