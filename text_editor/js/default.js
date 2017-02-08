$(document).ready(function(){
	var req_code = $(".codemirror-textarea")[0];
	var req_editor = CodeMirror.fromTextArea(req_code, {
		lineNumbers: true
	});

	var res_code = $(".codemirror-textarea")[1];
	var res_editor = CodeMirror.fromTextArea(res_code, {
		lineNumbers: true
	});
});