Window.prototype.resizeAndCenter = function(w,h){
	window.resizeTo(w,h);
	window.center(w,h);
};

Window.prototype.center = function(w,h){
	window.moveTo(
		(screen.availWidth - (w||window.outerWidth)) / 2,
		(screen.availHeight - (h||window.outerHeight)) / 2
	);
}

Window.prototype.minSize = function(w,h){
	window.addEventListener('resize', function(e){
		window.resizeTo(Math.max(w,window.outerWidth), Math.max(h,window.outerHeight));
	});
};

Window.prototype.maxSize = function(w,h){
	window.addEventListener('resize', function(e){
		window.resizeTo(Math.min(w,window.outerWidth), Math.min(h,window.outerHeight));
	});
};
