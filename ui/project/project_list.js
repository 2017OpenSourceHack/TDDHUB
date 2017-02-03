var test_response = {
	"totalcount": 2,
	"docs": [
		{
			"_id": "AABAB",
			"name": "Real",
			"description": "LOL",
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
		iDiv.className = 'project';
		iDiv.innerHTML = '<object type="text/html" data="project_simple.html" ></object>';
		document.getElementById('nav_project').appendChild(iDiv);
		$('div.' + i).find('#w_name').css('background-color', 'red');

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
/*
var k = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4151 128 646 70">' + 
'<defs><style>.cls-1, .cls-7 {fill: #fff;}.cls-2 {fill: #212121;font-size: 16px;opacity: 0.87;}.cls-2, .cls-3, .cls-4 {font-size: 15px;' + 
'font-family: Roboto-Regular, Roboto;}.cls-3, .cls-6 {font-size: 14px;}.cls-3 {opacity: 0.54;}.cls-4 {fill: #757575;font-size: 12px;}' +
'.cls-5 {fill: #999;opacity: 0.181;}.cls-6 {fill: #639500;font-family: NotoSansCJKkr-Medium, Noto Sans CJK KR;font-weight: 500;}' + 
'.cls-5:hover {fill: #A6E22E;opacity: 1;}.cls-7 {stroke: #95989a;}.cls-8 {fill: none;}.cls-9 {filter: url(#ui_card_light);}</style>' +
'<filter id="ui_card_light" x="4151" y="128" width="646" height="70" filterUnits="userSpaceOnUse"><feOffset dy="2" input="SourceAlpha"/>' + 
'<feGaussianBlur stdDeviation="1" result="blur"/><feFlood flood-opacity="0.498"/><feComposite operator="in" in2="blur"/>' + 
'<feComposite in="SourceGraphic"/></filter></defs><g id="그룹_14" data-name="그룹 14" transform="translate(3834 -46)">' + 
'<g id="text_notification" data-name="text notification" transform="translate(256 130)"><g class="cls-9" transform="matrix(1, 0, 0, 1, -4090, -84)">' + 
'<rect id="ui_card_light-2" data-name="ui card light" class="cls-1" width="640" height="64" rx="2" transform="translate(4154 129)"/></g>'
<text id="w_name" class="cls-2" transform="translate(128 73)"><tspan x="0" y="0">Name</tspan></text>
<text id="message" class="cls-3" transform="translate(128 95)"><tspan x="0" y="0">Message</tspan></text>
<text id="time" class="cls-4" transform="translate(428 81)"><tspan x="0" y="0">5:09 PM</tspan></text>
</g>
<g id="ui_press_pressed_btn_light" transform="translate(732 27)">
<rect id="rectangle" class="cls-5" width="96" height="36" rx="2" transform="translate(108 162)"
onmouseover="mouseOver()" onmouseout="mouseOut()"/>
<text id="Pressed" class="cls-6" transform="translate(156 185)"><tspan x="-12.88" y="0">공유</tspan></text>
</g>
<g id="그룹_2" data-name="그룹 2" transform="translate(186 -206)">
<g id="ic_folder_white_24px" transform="translate(151 396)">
<path id="패스_19" data-name="패스 19" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>
<path id="패스_20" data-name="패스 20" class="cls-8" d="M0,0H24V24H0Z"/>
</g>
<g id="ic_folder_white_24px-2" data-name="ic_folder_white_24px" transform="translate(154 401)">
<path id="패스_21" data-name="패스 21" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>
<path id="패스_22" data-name="패스 22" class="cls-8" d="M0,0H24V24H0Z"/>
</g>
<g id="ic_folder_white_24px-3" data-name="ic_folder_white_24px" transform="translate(157 406)">
<path id="패스_23" data-name="패스 23" class="cls-7" d="M10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8a2.006,2.006,0,0,0-2-2H12Z"/>
<path id="패스_24" data-name="패스 24" class="cls-8" d="M0,0H24V24H0Z"/>
</g>
</g>
</g>
</svg>*/

updateDiv(test_response);