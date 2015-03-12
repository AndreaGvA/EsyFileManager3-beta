###EsyFileManager 3.0.0 - beta
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


Build:

```
npm install
bower install
grunt
grunt min

```
