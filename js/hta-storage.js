window.storage = {
	_data: {},
	_storageFile: '',
	_fso: null,
	_init: function(id){
		var shell = new ActiveXObject('WScript.Shell');
		this._storageFile = shell.ExpandEnvironmentStrings('%APPDATA%') + '\\hta\\storage-' + (id||'generic');
		this._fso = new ActiveXObject('Scripting.FileSystemObject');
		
		var folder = this._fso.GetParentFolderName(this._storageFile);
		if (!this._fso.FolderExists(folder)) this._fso.CreateFolder(folder);
		if (this._fso.FileExists(this._storageFile)) {
			var fp = this._fso.OpenTextFile(this._storageFile, 1);
			try {
				this._data = JSON.parse(fp.ReadAll());
			} catch (e) {
			} finally {
				fp.Close()
			}
		}
	},
	_save: function(){
		var fp = this._fso.OpenTextFile(this._storageFile, 2, true);
		fp.Write(JSON.stringify(this._data));
		fp.Close();
	},
	getItem: function(key) {
		return this._data[key] || null;
	},
	setItem: function(key, value) {
		this._data[key] = String(value);
		this._save();
	},
	removeItem: function(key) {
		delete this._data[key];
		this._save();
	},
	clear: function() {
		this._data = {};
		this._save();
	},
    get length() {
        return Object.keys(this._data).length;
    },
};

window.storage._init((oHTA||{}).applicationName || 'generic');

