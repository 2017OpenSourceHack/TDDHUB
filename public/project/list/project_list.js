var test_response = {
	"totalcount": 2,
	"docs": [
		{
			"_id": "AABAB",
			"name": "Real",
			"description": "LOL",
			"url": "http://fake",
			"updated": "02.03",
			"master": "king",
			"creator": {
				"sid": 1,
				"name": "taehoon"
			},
			"sid": 2
		},
		{
			"_id": "TWTW",
			"name": "QWQ",
			"description": "RQR",
			"url": "http://fakeer",
			"updated": "02.04",
			"master": "queen",
			"creator": {
				"sid": 2,
				"name": "taehoon"
			},
			"sid": 3
		}
	]
}

function updateDiv(project_list){
	for (i = 0; i < project_list.totalcount; i++){
		var iDiv = document.createElement('div');
		iDiv.id = +i;
		iDiv.innerHTML = '<svg class="item" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4151 204 646 70"><defs><style>#nav_project { max-width: 600px; } #nav_project .cls-1, #nav_project .cls-7 {fill: #fff;}#nav_project .cls-2 {fill: #212121;opacity: 0.87;}#nav_project .cls-2, #nav_project .cls-3, #nav_project .cls-4 {font-family: Roboto-Regular, Roboto;}#nav_project .cls-3, #nav_project .cls-6 {font-size: 14px;}#nav_project .cls-3 {opacity: 0.54;}#nav_project .cls-4 {fill: #757575;font-size: 12px;}#nav_project .cls-5 {fill: #999;opacity: 0.181;}#nav_project .cls-6 {fill: #639500;font-family: NotoSansCJKkr-Medium, Noto Sans CJK KR;font-weight: 500;}#nav_project .cls-7 {stroke: #95989a;}#nav_project .cls-8 {fill: none;}#nav_project .cls-9 {filter: url(#ui_card_light);}.object-wrap {display: inline-block;}.click {position: absolute;}</style><filter id="ui_card_light" x="4151" y="204" width="646" height="70" filterUnits="userSpaceOnUse"><feOffset dy="2" input="SourceAlpha"/><feGaussianBlur stdDeviation="1" result="blur"/><feFlood flood-opacity="0.498"/><feComposite operator="in" in2="blur"/><feComposite in="SourceGraphic"/></filter></defs><g id="그룹_92" data-name="그룹 92" transform="translate(3834 -46)"><g id="text_notification" data-name="text notification" transform="translate(256 206)"><g class="cls-9" transform="matrix(1, 0, 0, 1, -4090, -160)"><rect id="ui_card_light-2" style="cursor:pointer" data-name="ui card light" class="cls-1 clickable_card" width="640" height="64" rx="2" transform="translate(4154 205)"/></g><text id="name" style="cursor:pointer" class="cls-2" transform="translate(128 73)">' + 
		'<tspan x="0" y="0">' + project_list.docs[i].name + '</tspan></text><text id="message" style="cursor:pointer" class="cls-3" transform="translate(128 95)">' + 
		'<tspan x="0" y="0">' + project_list.docs[i].description + '</tspan></text><text id="time" style="cursor:pointer" class="cls-4" transform="translate(251 81)">' + 
		'<tspan x="0" y="0">' + project_list.docs[i].url + '</tspan></text><text id="time-2" style="cursor:pointer" data-name="time" class="cls-4" transform="translate(387 81)">' + 
		'<tspan x="0" y="0">' + project_list.docs[i].updated + '</tspan></text><text id="time-3" style="cursor:pointer" data-name="time" class="cls-4" transform="translate(480 81)">' + 
		'<tspan x="0" y="0">' + project_list.docs[i].master + '</tspan></text></g><g id="ui_press_pressed_btn_light" transform="translate(732 103)"><rect id="rectangle" style="cursor:pointer" class="cls-5" width="96" height="36" rx="2" transform="translate(108 162)"/><text id="Pressed" style="cursor:pointer" class="cls-6" transform="translate(156 185)"><tspan x="-12.88" y="0">공유</tspan></text></g><g id="그룹_3" data-name="그룹 3" transform="translate(186 -130)"><g id="ic_folder_white_24px" transform="translate(151 396)"><path id="패스_25" data-name="패스 25" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/><path id="패스_26" data-name="패스 26" class="cls-8" d="M0,0H24V24H0Z"/></g><g id="ic_folder_white_24px-2" data-name="ic_folder_white_24px" transform="translate(154 401)"><path id="패스_27" data-name="패스 27" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/><path id="패스_28" data-name="패스 28" class="cls-8" d="M0,0H24V24H0Z"/></g><g id="ic_folder_white_24px-3" data-name="ic_folder_white_24px" transform="translate(157 406)"><path id="패스_29" data-name="패스 29" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/><path id="패스_30" data-name="패스 30" class="cls-8" d="M0,0H24V24H0Z"/></g></g></g></svg>';
		
		document.getElementById('nav_project').appendChild(iDiv);
	}
}

function removeDiv(obj){
	document.getElementById('field').removeChild(obj.parentNode);
}


function mouseOver(){
	var txt=document.getElementById("Pressed");
	txt.style.fill = "#ffffff";
}
function mouseOut(){
	var txt=document.getElementById("Pressed");
	txt.style.fill = "#639500";
}

updateDiv(test_response);


$(document).ready(function(){
	$('.item').click(function(){
		$(this).context.style.opacity = "0.95";
		//$(this).context.style.fill = "#eee";
	});
	$('#ui_press_pressed_btn_light').click(function(){
		$(this).context.style.opacity = "0.2";
	});
});


	/*
'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4151 204 646 70">' + 
'<defs>' + 
'<style>' + 
'.cls-1, .cls-7 {' + 
'fill: #fff;' + 
'}' + 

'.cls-2 {' + 
'fill: #212121;' + 
'font-size: 16px;' + 
'opacity: 0.87;' + 
'}' + 

'.cls-2, .cls-3, .cls-4 {' + 
'font-family: Roboto-Regular, Roboto;' + 
'}' + 

'.cls-3, .cls-6 {' + 
'font-size: 14px;' + 
'}' + 

'.cls-3 {' + 
'opacity: 0.54;' + 
'}' + 

'.cls-4 {' + 
'fill: #757575;' + 
'font-size: 12px;' + 
'}' + 

'.cls-5 {' + 
'fill: #999;' + 
'opacity: 0.181;' + 
'}' + 

'.cls-6 {' + 
'fill: #639500;' + 
'font-family: NotoSansCJKkr-Medium, Noto Sans CJK KR;' + 
'font-weight: 500;' + 
'}' + 

'.cls-7 {' + 
'stroke: #95989a;' + 
'}' + 

'.cls-8 {' + 
'fill: none;' + 
'}' + 

'.cls-9 {' + 
'filter: url(#ui_card_light);' + 
'}' + 
'</style>' + 
'<filter id="ui_card_light" x="4151" y="204" width="646" height="70" filterUnits="userSpaceOnUse">' + 
'<feOffset dy="2" input="SourceAlpha"/>' + 
'<feGaussianBlur stdDeviation="1" result="blur"/>' + 
'<feFlood flood-opacity="0.498"/>' + 
'<feComposite operator="in" in2="blur"/>' + 
'<feComposite in="SourceGraphic"/>' + 
'</filter>' + 
'</defs>' + 
'<g id="그룹_92" data-name="그룹 92" transform="translate(3834 -46)">' + 
'<g id="text_notification" data-name="text notification" transform="translate(256 206)">' + 
'<g class="cls-9" transform="matrix(1, 0, 0, 1, -4090, -160)">' + 
'<rect id="ui_card_light-2" style="cursor:pointer" data-name="ui card light" class="cls-1 clickable_card" width="640" height="64" rx="2" transform="translate(4154 205)"/>' + 
'</g>' + 
'<text id="name" style="cursor:pointer" class="cls-2" transform="translate(128 73)"><tspan x="0" y="0">Name</tspan></text>' + 
'<text id="message" style="cursor:pointer" class="cls-3" transform="translate(128 95)"><tspan x="0" y="0">Description</tspan></text>' + 
'<text id="time" style="cursor:pointer" class="cls-4" transform="translate(251 81)"><tspan x="0" y="0">http://localhost: ……</tspan></text>' + 
'<text id="time-2" style="cursor:pointer" data-name="time" class="cls-4" transform="translate(387 81)"><tspan x="0" y="0">5:09 PM</tspan></text>' + 
'<text id="time-3" style="cursor:pointer" data-name="time" class="cls-4" transform="translate(480 81)"><tspan x="0" y="0">seo.te</tspan></text>' + 
'</g>' + 
'<g id="ui_press_pressed_btn_light" transform="translate(732 103)">' + 
'<rect id="rectangle" style="cursor:pointer" class="cls-5" width="96" height="36" rx="2" transform="translate(108 162)"/>' + 
'<text id="Pressed" style="cursor:pointer" class="cls-6" transform="translate(156 185)"><tspan x="-12.88" y="0">공유</tspan></text>' + 
'</g>' + 
'<g id="그룹_3" data-name="그룹 3" transform="translate(186 -130)">' + 
'<g id="ic_folder_white_24px" transform="translate(151 396)">' + 
'<path id="패스_25" data-name="패스 25" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>' + 
'<path id="패스_26" data-name="패스 26" class="cls-8" d="M0,0H24V24H0Z"/>' + 
'</g>' + 
'<g id="ic_folder_white_24px-2" data-name="ic_folder_white_24px" transform="translate(154 401)">' + 
'<path id="패스_27" data-name="패스 27" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>' + 
'<path id="패스_28" data-name="패스 28" class="cls-8" d="M0,0H24V24H0Z"/>' + 
'</g>' + 
'<g id="ic_folder_white_24px-3" data-name="ic_folder_white_24px" transform="translate(157 406)">' + 
'<path id="패스_29" data-name="패스 29" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>' + 
'<path id="패스_30" data-name="패스 30" class="cls-8" d="M0,0H24V24H0Z"/>' + 
'</g>' + 
'</g>' + 
'</g>' + 
'</svg>';
*/