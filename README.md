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
	  mode: {
	  	type: "input", // input || button 
	  	selector: "fm-open"
	  },
	  size: true,
	  width: 300,
	  height: 400,
	  files: {
	  	dir:"uploads/",
	  	replace:""
	  },
	  del: {
	  	allowDelete: true,
	  	txtOnDelete: 'Sei sicuro di voler eliminare i files selezionati',
	  },
	  callback:{
	  	onDelete: function(data){ },
	  	onUploaded: function(file, data){},
	  	totalProgress: function(json, uploadedBytes, totalBytes){}
	  }
}

```

Changelog

```
15/03/2015 - File Info and image preview
15/03/2015 - Callback onDelete, onUploaded, totalProgress
14/03/2015 - ckEditor connector
14/03/2015 - Total Uploads Progress Bar
14/03/2015 - Button mode

```

ToDo's:

```
1. Notification Area
2. Enable/Disable Notifications
3. TinyMce Integration
4. FilesTree (Handle Directories) Mode
5. PHP connector for db Usage

```

Build:

```
npm install
bower install
grunt
grunt min

```
