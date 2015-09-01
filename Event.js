function EDEvent(rectangles,circles){
this.eventContainer = document.querySelector('#eventContainer');
this.rectangles = rectangles;
this.circles = circles;
this.saveButton = document.querySelector("#saveEventButton");
this.eventOptionObjectsButton = document.querySelector("#event_option_objects");
this.eventObjectsOption = Array.prototype.slice.call(document.querySelectorAll('.event_objects_option'));
this.eventObjectsOptionContainer = document.querySelector(".event_objects_option_container");
this.eventPlannerContainer = document.querySelector('.eventPlannerContainer');
this.eventLowerListItem = Array.prototype.slice.call(document.querySelectorAll('.eventLowerListItem'));
this.eventTableCancelButton = document.querySelector('.table_cancel_button');
this.eventTableCreateButton = document.querySelector('#event_table_create_button');
this.eventNewItemContainer = document.querySelector('.event_new_item_container');
this.eventTextObjectCreateButton = document.querySelector('#text_object_create_button');
this.saveEventButton = document.querySelector('#saveEventButton');
this.elementEditContainer = document.querySelector('.elementEditContainer');
this.dimCalculator = document.querySelector('.dim_calculator');
this.event_sections = new Array();
this.event_tables = new Array();
this.event_objects = new Array();
this.event_text_objects = new Array();
this.remove_list = new Array();
this.eventId = document.querySelector('.event_id_container').innerHTML;
this.eventId = this.eventId.trim();
this.eventName = document.querySelector('.event_name_container').innerHTML;
this.eventName = this.eventName.trim();
this.databaseObject = new EventDB(this.eventName);
this.init();
}

EDEvent.prototype = {

init : function(){

this.get_event_details();
this.initEvents();
this.createSvg();
//this.drawElements();
},

initEvents : function(){
var self = this;
this.saveButton.addEventListener('click',function(){
self.saveElements(self.rectangles,self.circles);
});
this.eventLowerListItem.forEach(function(el,i){
console.log(el);
el.addEventListener('click',function(){
console.log('event lower');
var event_type = this.getAttribute("data-new-type");

switch(event_type){

case 'object':
self.eventNewItemContainer.classList.remove('show');
self.eventObjectsOptionContainer.classList.toggle('show');
break;

case 'text':
self.eventNewItemContainer.classList.remove('show');
document.querySelector('.event_new_text_container').classList.toggle('show');
break;

case 'section':
self.eventNewItemContainer.classList.remove('show');
document.querySelector('.event_new_section_container').classList.toggle('show');
break;

default:
self.eventNewItemContainer.classList.remove('show');
document.querySelector('.event_new_table_container').classList.toggle('show');
break;


}

});
});

this.eventTableCancelButton.addEventListener('click',function(){
document.querySelector('.event_new_table_container').classList.remove('show');
});

this.eventObjectsOption.forEach(function(el,i){
el.addEventListener('click',function(){
console.log('dance option item');
var option_item = this.getAttribute("data-option-item");
var x = 400;
var y = 160;
var height = 90;
var width = 180;
self.databaseObject.add_object(option_item,x,y,height,width,self.eventId);
self.create_object_option(option_item,x,y,height,width);
});
});

this.eventTableCreateButton.addEventListener('click',function(){
console.log('event table create button');
var num_of_seats = document.querySelector('#event_new_table_seats').innerHTML;
num_of_seats.trim();
num_of_seats = num_of_seats.replace(/^\s+|\s+$/g,'');                       
self.create_table(num_of_seats,300,250);
document.querySelector('.event_new_table_container').classList.remove('show');

self.databaseObject.add_table('',60,60,'','',num_of_seats,self.eventId);
});

document.querySelector('#eventCreateSectionButton').addEventListener('click',function(){
var num_of_rows = document.querySelector('#event_new_section_rows').innerHTML;
var section_name = document.querySelector('#event_new_section_name').value;
var num_of_seats = document.querySelector('#event_new_section_seats').innerHTML;
num_of_rows = num_of_rows.trim();
num_of_seats = num_of_seats.trim();
self.create_event_section(section_name,30,30,num_of_rows,num_of_seats);
self.databaseObject.add_section(section_name,20,20,num_of_rows,num_of_seats,self.eventId);
document.querySelector('.event_new_section_container').classList.remove('show');
});


this.eventTextObjectCreateButton.addEventListener('click',function(){
var text = document.querySelector('#text_object_name').value;
text = text.trim();
var text_size = document.querySelector('#text_object_size_container').getAttribute("data-text-size");
var tx = 40;
var ty = 40;
self.create_text_object(text,tx,ty,text_size);
console.log('text size: '+text_size);
self.databaseObject.add_text_object(text,tx,ty,text_size,self.eventId);
document.querySelector('.event_new_text_container').classList.remove('show');
});


this.saveEventButton.addEventListener('click',function(){

var self_button = this;

self.event_sections.forEach(function(el,i){
var name = el.name;
var x = document.querySelector('#event_section_'+el.id).offsetLeft;
var y = document.querySelector('#event_section_'+el.id).offsetTop;
var num_of_rows = el.num_of_rows;
var num_of_seats = el.num_of_seats;
console.log('x offset: '+x+' y offset: '+y);
self.update_section(name,el.x,el.y,x,y,num_of_rows,num_of_seats,self.eventId);
});


self.event_tables.forEach(function(el,i){
var name = el.name;
var x = document.querySelector('#event_table_'+el.id).offsetLeft;
var y = document.querySelector('#event_table_'+el.id).offsetTop;
var num_of_seats = el.num_of_seats;
console.log(self.event_tables[0].x+'<br/>'+el.x);
console.log(self.event_tables);
self.update_table(name,el.x,el.y,x,y,num_of_seats,self.eventId);
});


self.event_text_objects.forEach(function(el,i){
var text = el.text;
var text_size = el.text_size;
var x = document.querySelector('#event_text_object_'+el.id).offsetLeft;
var y = document.querySelector('#event_text_object_'+el.id).offsetTop;
//console.log('x offset: '+x+' y offset: '+y);
self.update_text_object(text,el.x,el.y,x,y,text_size,self.eventId);
});


self.event_objects.forEach(function(el,i){
var name = el.name;
var x = document.querySelector('#event_object_'+el.id).offsetLeft;
var y = document.querySelector('#event_object_'+el.id).offsetTop;
var num_of_seats = el.num_of_seats;
console.log('x offset: '+x+' y offset: '+y);
self.update_object(name,el.x,el.y,x,y,el.height,el.width,self.eventId);
});


this.innerHTML = 'SAVED!';

setTimeout(function(){
 
self_button.innerHTML = 'SAVE';  
},1200);

});

},

add_table_element_events : function(name,seats,id){

var self = this;

var event_table_element_container = document.querySelector('.event_table_element_container');
event_table_element_container.addEventListener('click',function(){
var event_element_edit_container = event_table_element_container.querySelector('.event_element_edit_container');
var table_cancel_button = event_element_edit_container.querySelector('.table_cancel_button');
event_element_edit_container.classList.add('show');
event_element_edit_container.querySelector('.table_create_button').innerHTML = 'SAVE';
table_cancel_button.innerHTML = 'DELETE';
table_cancel_button.classList.add('table_edit_delete_button');

table_cancel_button.addEventListener('click',function(){
document.querySelector('#event_table_'+id).style.display = 'none';
var name = self.event_tables[id-1].name;
var x = self.event_tables[id-1].x;
var y = self.event_tables[id-1].y;
var rseats = self.event_tables[id-1].num_of_seats;
self.remove_table(name,x,y,rseats,self.eventId);
});



event_element_edit_container.querySelector('.event_info_input').value = name;
event_element_edit_container.querySelector('#event_new_table_seats').innerHTML = seats;
});

},


add_section_element_events : function(name,num_of_rows,num_of_seats,id){

var self = this;

var event_section_element_container = document.querySelector('.event_section_element_container');
event_section_element_container.addEventListener('click',function(e){
var event_element_edit_container = event_section_element_container.querySelector('.event_element_edit_container');
event_element_edit_container.classList.add('show');
var section_cancel_button = event_element_edit_container.querySelector('.table_create_button');
section_cancel_button.innerHTML = 'SAVE';
var section_delete_button = event_element_edit_container.querySelector('.table_cancel_button');
section_delete_button.innerHTML = 'DELETE';

section_delete_button.addEventListener('click',function(){
document.querySelector('#event_section_'+id).style.display = 'none';
var name = self.event_sections[id-1].name;
var x = self.event_sections[id-1].x;
var y = self.event_sections[id-1].y;
var num_of_rows = self.event_sections[id-1].num_of_rows;
var num_of_seats = self.event_sections[id-1].num_of_seats;
self.remove_section(name,x,y,num_of_rows,num_of_seats,self.eventId);
});

event_element_edit_container.querySelector('#event_new_section_rows').innerHTML = num_of_rows;
event_element_edit_container.querySelector('#event_new_section_seats').innerHTML = num_of_seats;
event_element_edit_container.querySelector('.event_info_input').value = name;

});

},


add_object_element_events : function(id){

var self = this;

var event_object_element_container = document.querySelector('.event_object_element_container');
event_object_element_container.addEventListener('click',function(){
var event_element_edit_container = event_object_element_container.querySelector('.event_element_edit_container');
event_element_edit_container.classList.add('show');
var object_delete_button = event_element_edit_container.querySelector('.table_cancel_button');
object_delete_button.innerHTML = 'DELETE';

object_delete_button.addEventListener('click',function(){
document.querySelector('#event_object_'+id).style.display = 'none';
var name = self.event_objects[id-1].name;
var x = self.event_objects[id-1].x;
var y = self.event_objects[id-1].y;
var height = self.event_objects[id-1].height;
var width = self.event_objects[id-1].width;
self.remove_object(name,x,y,height,width,self.eventId);
});

});

},


add_text_object_element_events : function(text,text_size,id){

var self = this;

var event_text_object_element_container = document.querySelector('.event_text_object_element_container');
event_text_object_element_container.addEventListener('click',function(){
var event_element_edit_container = event_text_object_element_container.querySelector('.event_element_edit_container');
event_element_edit_container.classList.add('show');
var text_object_cancel_button = event_element_edit_container.querySelector('.table_create_button');
text_object_cancel_button.innerHTML = 'SAVE';
var text_object_delete_button = event_element_edit_container.querySelector('.table_cancel_button');
text_object_delete_button.innerHTML = 'DELETE';

text_object_delete_button.addEventListener('click',function(){
document.querySelector('#event_text_object_'+id).style.display = 'none';
var text = self.event_text_object[id-1].text;
var x = self.event_text_objects[id-1].x;
var y = self.event_text_objects[id-1].y;
var text_size = self.event_sections[id-1].text_size;
self.remove_section(text,x,y,text_size,self.eventId);
});

event_element_edit_container.querySelector('.event_info_input').value = text;

});

},




drawCircleSeats : function(num,divx,divy){
var self = this;
var seats_coords = new Array();
var cr = 0;
divx = parseInt(divx);
divy = parseInt(divy);
var rect_height = 120;
var rect_width = 160;
var x = 60;
var y = 60;
switch(num){

case '1':
x1 = x;
y1 = y-40;
cr = 20;
seats_coords = [{'x':x1,'y':y1}];
break;

case '2':
x1 = x;
y1 = y-40;
x2 = x;
y2 = y+40;
cr = 20;
seats_coords = [{'x':x1,'y':y1},{'x':x2,'y':y2}];
break;

case '3':
x1 = x;
y1 = y-40;
x2 = x+30;
y2 = y+30;
x3 = x-30;
y3 = y+30;
cr = 20;
seats_coords = [{'x':x1,'y':y1},{'x':x2,'y':y2},{'x':x3,'y':y3}];
break;

case '4':
x1 = x;
y1 = y-40;
x2 = x;
y2 = y+40;
x3 = x-40;
y3 = y;
x4 = x+40;
y4 = y;
cr = 20;
seats_coords = [{'x':x1,'y':y1},{'x':x2,'y':y2},{'x':x3,'y':y3},{'x':x4,'y':y4}];
break;

case '5':
x1 = 0;
y1 = 0;
x2 = 0;
y2 = 0;
x3 = 0;
y3 = 0;
x4 = 0;
y4 = 0;
x5 = 0;
y5 = 0;
cr = 20;
seats_coords = [{'x':x1,'y':y1},{'x':x2,'y':y2},{'x':x3,'y':y3},{'x':x4,'y':y4},{'x':x5,'y':y5}];
break;

}

var foreignElement = document.createElementNS(this.svgns,"foreignObject");
foreignElement.setAttribute("x","0");
foreignElement.setAttribute("y","0");
foreignElement.setAttribute("height","800");
foreignElement.setAttribute("width","800");

var elementEditContainer = document.createElement('div');
elementEditContainer.setAttribute("class","element_edit_container");
var table_option_container = document.querySelector('.event_new_table_container');
var table_edit_container = table_option_container.cloneNode(true);
table_edit_container.setAttribute("class","event_element_edit_container");
table_edit_container.classList.add("event_new_item_container");

var elementRemoveContainer = document.createElement('div');
elementRemoveContainer.setAttribute('class','eventRemoveContainer');

var eventTableSeatsItemContainer = document.createElement('div');
eventTableSeatsItemContainer.classList.add("eventTableSeatsItemContainer");
eventTableSeatsItemContainer.classList.add("event_table_element_container");
eventTableSeatsItemContainer.classList.add("event_draggable");
eventTableSeatsItemContainer.style.position = "absolute";
eventTableSeatsItemContainer.style.top = divy+"px";
eventTableSeatsItemContainer.style.left = divx+"px";
eventTableSeatsItemContainer.style.height = rect_height+"px";
eventTableSeatsItemContainer.style.width = rect_width+"px";

var innerSvgContainer = document.createElementNS(this.svgns,"svg");
innerSvgContainer.setAttribute("height",rect_height);
innerSvgContainer.setAttribute("width",rect_width);

eventTableSeatsItemContainer.appendChild(table_edit_container);
eventTableSeatsItemContainer.appendChild(innerSvgContainer);
eventTableSeatsItemContainer.appendChild(elementRemoveContainer);

var bigCircle = document.createElementNS(this.svgns,"circle");
bigCircle.setAttribute("r",cr);
bigCircle.setAttribute("fill","#fff");
bigCircle.setAttribute("cx",x);
bigCircle.setAttribute("cy",y);
bigCircle.setAttribute("stroke","#1ebcfa");
innerSvgContainer.appendChild(bigCircle);

for(var i=0;i<num;i++){
console.log('seat coords');
console.log(seats_coords);
var cx = seats_coords[i]['x'];
var cy = seats_coords[i]['y'];
var smallcircle = document.createElementNS(this.svgns,"circle");
smallcircle.setAttribute("r",15);
smallcircle.setAttribute("fill","#fff");
smallcircle.setAttribute("stroke","#1ebcfa");
smallcircle.setAttribute("cx",cx);
smallcircle.setAttribute("cy",cy);
innerSvgContainer.appendChild(smallcircle);
}

foreignElement.appendChild(eventTableSeatsItemContainer);
this.svgContainer.appendChild(foreignElement);

$('.event_draggable').draggable();
var arr_id = this.event_tables.length+1;
var table_id = 'event_table_'+arr_id;
this.event_tables.push({name:'',x:divx,y:divy,num_of_seats:num,id:arr_id});
eventTableSeatsItemContainer.setAttribute("id",table_id);
this.add_table_element_events('',num,arr_id);



elementRemoveContainer.addEventListener('click',function(){
 
var element = document.getElementById(table_id);
var top = element.offsetTop;
var left = element.offsetLeft;
var height = element.offsetHeight;
var width = element.offsetWidth;

element.parentNode.removeChild(element); 
self.remove_table('',left,top,num,self.eventId);
console.log('left: '+left+' top: '+top+'num: '+num+' event_id: '+self.eventId);
});


},

drawBigCircle : function(){
},


create_object_option : function(option_item,x,y,height,width){

var self = this;

var foreignObject = document.createElementNS(this.svgns,'foreignObject');
foreignObject.setAttribute("x","0");
foreignObject.setAttribute("y","0");
foreignObject.setAttribute("height","0");
foreignObject.setAttribute("width","0");

var option_item_container = document.createElement('div');
var option_item_inner_container = document.createElement('div');
option_item_inner_container.classList.add("class","option_item_inner_container");


var elementEditContainer = document.createElement('div');
elementEditContainer.setAttribute("class","element_edit_container");
var table_option_container = document.querySelector('.event_new_table_container');
var table_edit_container = table_option_container.cloneNode(true);
table_edit_container.setAttribute("class","event_element_edit_container");
table_edit_container.classList.add("event_new_item_container");

switch(option_item){
case 'stage':
option_item_inner_container.innerHTML = 'Stage';
option_item_container.setAttribute("id","stage_option_item_container");
option_item_container.classList.add("class","option_stage_container");
break;

case 'dance':
option_item_inner_container.innerHTML = 'Dance';
option_item_container.setAttribute("id","dance_option_item_container");
option_item_container.classList.add("class","option_dance_container");
break;

case 'food':
option_item_inner_container.innerHTML = 'Food';
option_item_container.setAttribute("id","food_option_item_container");
option_item_container.classList.add("class","option_food_container");
break;

case 'bathroom':
option_item_inner_container.innerHTML = 'Bathroom';
option_item_container.setAttribute("id","bathroom_option_item_container");
option_item_container.classList.add("class","option_bathroom_container");
break;

case 'exit':
option_item_inner_container.innerHTML = 'Exit';
option_item_container.setAttribute("id","dance_option_item_container");
option_item_container.classList.add("class","option_exit_container");
break;


case 'drink':
option_item_inner_container.innerHTML = 'Drink';
option_item_container.setAttribute("id","drink_option_item_container");
option_item_container.classList.add("class","option_dance_container");
break;

case 'circle':
option_item_inner_container.innerHTML = 'Circle';
option_item_container.setAttribute("id","circle_option_item_container");
option_item_container.classList.add("class","option_dance_container");
break;

case 'square':
option_item_inner_container.innerHTML = 'Square';
option_item_container.setAttribute("id","square_option_item_container");
option_item_container.classList.add("class","option_dance_container");
break;

case 'line':
option_item_inner_container.innerHTML = 'Line';
option_item_container.setAttribute("id","line_option_item_container");
option_item_container.classList.add("class","option_dance_container");
break;

}

option_item_container.classList.add("class","option_item_container");
option_item_container.classList.add("class","event_object_element_container");
option_item_container.classList.add("class","event_resizable");
option_item_container.classList.add("class","event_draggable");
option_item_container.style.top = y+"px";
option_item_container.style.left = x+"px";
option_item_container.appendChild(table_edit_container);
option_item_container.appendChild(option_item_inner_container);
foreignObject.appendChild(option_item_container);
self.svgContainer.appendChild(foreignObject);
self.eventObjectsOptionContainer.classList.remove('show');
console.log('event id: '+self.eventId);
$('.event_draggable').draggable();
$('.event_resizable').resizable();
var arr_id = this.event_objects.length+1;
var object_id = 'event_object_'+arr_id;
console.log('object id: '+arr_id);
self.event_objects.push({name:option_item,x:x,y:y,height:height,width:width,id:arr_id});
option_item_container.setAttribute("id",object_id);
self.add_object_element_events(arr_id);

},


drawElements : function(){

this.drawBigCircle();
this.drawCircleSeats(5,30,30);
//this.drawRectangle();

},

saveElements : function(){

},

drawRectangle : function(){
var rectContainer = document.createElementNS(this.svgns,'rect');
rectContainer.setAttribute("height",400);
rectContainer.setAttribute("width",400);
rectContainer.setAttribute("x",200);
rectContainer.setAttribute("y",100);
rectContainer.setAttribute("fill","black");
this.svgContainer.appendChild(rectContainer);
},

drawCircle : function(){
},

createSvg : function(){
console.log('createsvg');
this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg","svg");
this.svgns = this.svgContainer.namespaceURI;
this.svgContainer.setAttribute("height",800);
this.svgContainer.setAttribute("width","100%");
this.svgContainer.setAttribute("fill","green");
this.svgContainer.setAttribute("id","event_planner_svg_container");
this.eventPlannerContainer.appendChild(this.svgContainer);
},


showEvent : function(event_name){

},


create_table : function(num,x,y){
this.drawCircleSeats(num,x,y);
},


create_event_section : function(text,section_x,section_y,num_of_rows,num_of_seats){
console.log('create event section: '+section_x+' y: '+section_y);
var eventTableSeatsItemContainer = document.createElement('div');
//eventTableSeatsItemContainer.classList.add("eventTableSeatsItemContainer");
eventTableSeatsItemContainer.classList.add("event_draggable");
eventTableSeatsItemContainer.classList.add("event_section_element_container");
eventTableSeatsItemContainer.style.position = "absolute";
eventTableSeatsItemContainer.style.top = section_y+"px";
eventTableSeatsItemContainer.style.left = section_x+"px";
eventTableSeatsItemContainer.style.height = "240px";
eventTableSeatsItemContainer.style.width = "160px";


var elementEditContainer = document.createElement('div');
elementEditContainer.setAttribute("class","element_edit_container");
var table_option_container = document.querySelector('.event_new_section_container');
var table_edit_container = table_option_container.cloneNode(true);
table_edit_container.setAttribute("class","event_element_edit_container");
table_edit_container.classList.add("event_new_item_container");


var foreignObject = document.createElementNS(this.svgns,"foreignObject");
foreignObject.setAttribute("x",20);
foreignObject.setAttribute("y",20);
foreignObject.setAttribute("height","800");
foreignObject.setAttribute("width","800");

var innerSvgContainer = document.createElementNS(this.svgns,'svg');

innerSvgContainer.setAttribute("height","800");
innerSvgContainer.setAttribute("width","800");


var section_text_container = document.createElementNS(this.svgns,'text');
section_text_container.innerHTML = text;
section_text_container.setAttribute("x","50");
section_text_container.setAttribute("y","100");
section_text_container.setAttribute("fill","#000");


for(var j=0;j<num_of_rows;j++){
for(var i=0;i<num_of_seats;i++){
var cx = 40*i+40;
var cy = 40*j+140;
var section_circle = document.createElementNS(this.svgns,'circle');
section_circle.setAttribute("cx",cx);
section_circle.setAttribute("cy",cy);
section_circle.setAttribute("r",15);
section_circle.setAttribute("fill","#fff");
section_circle.setAttribute("stroke","#000");

innerSvgContainer.appendChild(section_circle);
}

}

eventTableSeatsItemContainer.appendChild(table_edit_container);
innerSvgContainer.appendChild(section_text_container);
eventTableSeatsItemContainer.appendChild(innerSvgContainer);
foreignObject.appendChild(eventTableSeatsItemContainer);
this.svgContainer.appendChild(foreignObject);
$('.event_draggable').draggable();

var arr_id = this.event_sections.length+1;
console.log('section id: '+arr_id);
var section_id = 'event_section_'+arr_id;
this.event_sections.push({name:text,x:section_x,y:section_y,num_of_rows:num_of_rows,num_of_seats:num_of_seats,id:arr_id});
eventTableSeatsItemContainer.setAttribute("id",section_id);
this.add_section_element_events(text,num_of_rows,num_of_seats,arr_id);

},


create_text_object : function(text,x,y,size){
console.log('text object size: '+size);

var textDivContainer = document.createElement('div');
textDivContainer.setAttribute("class","eventTableSeatsItemContainer");
textDivContainer.setAttribute("class","event_draggable");
textDivContainer.classList.add('event_text_object_element_container');
textDivContainer.style.position = "absolute";
textDivContainer.style.top = y+"px";
textDivContainer.style.left = x+"px";
textDivContainer.style.height = "80px";
textDivContainer.style.width = "120px";

var elementEditContainer = document.createElement('div');
elementEditContainer.setAttribute("class","element_edit_container");
var table_option_container = document.querySelector('.event_new_text_container');
var table_edit_container = table_option_container.cloneNode(true);
table_edit_container.setAttribute("class","event_element_edit_container");
table_edit_container.classList.add("event_new_item_container");

var foreignObject = document.createElementNS(this.svgns,'foreignObject');
foreignObject.setAttribute("x",0);
foreignObject.setAttribute("y",0);
foreignObject.setAttribute("height","80");
foreignObject.setAttribute("width","120");

var innerSvgContainer = document.createElementNS(this.svgns,'svg');
innerSvgContainer.setAttribute("height","80");
innerSvgContainer.setAttribute("width","120");

var innerTextContainer = document.createElementNS(this.svgns,'text');
innerTextContainer.setAttribute("x","10");
innerTextContainer.setAttribute("y","30");
innerTextContainer.setAttribute("fill","black");
innerTextContainer.innerHTML = text;

innerSvgContainer.appendChild(innerTextContainer);
textDivContainer.appendChild(table_edit_container);
textDivContainer.appendChild(innerSvgContainer);
foreignObject.appendChild(textDivContainer);
this.svgContainer.appendChild(foreignObject);
$('.event_draggable').draggable();
var arr_id = this.event_text_objects.length+1;
var text_id = 'event_text_object_'+arr_id;
console.log('text object id: '+size);
this.event_text_objects.push({text:text,x:x,y:y,text_size:size,id:arr_id});
textDivContainer.setAttribute("id",text_id);
this.add_text_object_element_events(text,size,arr_id);
},


get_event_details : function(){

this.get_event_sections(this.eventId);
this.get_event_tables(this.eventId);
this.get_event_objects(this.eventId);
this.get_event_text_objects(this.eventId);

},



get_event_sections : function(event_id){

var self = this;
var sections_no;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'get_event_sections',event_id:event_id},
dataType:"json",
});

request.done(function(data){
sections_no = data.data.length;
document.querySelector('.sections_no').innerText = sections_no;  
data.data.forEach(function(el,i){
var section_name = el.name;
var num_of_rows = el.num_of_rows;
var num_of_seats = el.num_of_seats;
var x = el.x;
var y = el.y;
self.create_event_section(section_name,x,y,num_of_rows,num_of_seats);
});
});

return sections_no;

},

get_event_objects : function(event_id){

var self = this;
var objects_no;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'get_event_objects',event_id:event_id},
dataType:"json",
});


request.done(function(data){
objects_no = data.data.length;
document.querySelector('.objects_no').innerText = objects_no;
data.data.forEach(function(el,i){
var name = el.name;
var x = el.x;
var y = el.y;
var height = el.height;
var width = el.width;
self.create_object_option(name,x,y,height,width);
});
});

return objects_no;
},

get_event_tables : function(event_id){

var self = this;
var tables_no;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'get_event_tables',event_id:event_id},
dataType:"json",
});


request.done(function(data){
tables_no = data.data.length;  
document.querySelector('.tables_no').innerText = tables_no;
data.data.forEach(function(el,i){
var num_of_seats = el.num_of_seats;
var x = el.x;
var y = el.y;
console.log('get table : '+i+' x,y: '+el.x+'<br/>'+el.y);
self.create_table(num_of_seats,x,y);
});

console.log(self.event_tables);
});

return tables_no;

},

get_event_text_objects : function(event_id){

var self = this;
var text_objects_no;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'get_event_text_objects',event_id:event_id},
dataType:"json",
});


request.done(function(data){
text_objects_no = data.data.length;
document.querySelector('.text_objects_no').innerText = text_objects_no;
data.data.forEach(function(el,i){
var text = el.text;
var x = el.x;
var y = el.y;
var text_size = el.size;
self.create_text_object(text,x,y,text_size);
});
});

return text_objects_no;
},


update_section : function(name,oldx,oldy,x,y,num_of_rows,num_of_seats,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'update_section',name:name,oldx:oldx,oldy:oldy,x:x,y:y,num_of_rows:num_of_rows,num_of_seats:num_of_seats,event_id:event_id},
dataType:"json",
});


request.done(function(data){
self.event_sections.forEach(function(el,i){
if(el.name == name && el.x == oldx && el.y == oldy && num_of_rows == num_of_rows && num_of_seats == num_of_seats){
self.event_sections[i].x = x;
self.event_sections[i].y = y;
}
});
});

},


update_table : function(name,oldx,oldy,x,y,num_of_seats,event_id){

var self = this;
 
var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'update_table',name:name,oldx:oldx,oldy:oldy,x:x,y:y,num_of_seats:num_of_seats,event_id:event_id},
dataType:"json",
});


request.done(function(data){
console.log('table updated');
self.event_tables.forEach(function(el,i){
if(el.name == name && el.x == oldx && el.y == oldy && el.num_of_seats == num_of_seats){
console.log('table present:'+el.x+' present y: '+el.y+' updating x:'+x+' and y:'+y+' index:'+i);
console.log(self.event_tables);
self.event_tables[i].x = x;
self.event_tables[i].y = y;
console.log(self.event_tables[i].x);
console.log(self.event_tables);
}
});

});

},


update_object : function(name,oldx,oldy,x,y,height,width,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'update_object',name:name,oldx:oldx,oldy:oldy,x:x,y:y,height:height,width:width,event_id:event_id},
dataType:"json",
});


request.done(function(data){
self.event_objects.forEach(function(el,i){
if(el.name == name && el.x == oldx && el.y == oldy && height == height && width == width){
self.event_objects[i].x = x;
self.event_objects[i].y = y;
}
});
});

},


update_text_object : function(text,oldx,oldy,x,y,text_size,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'update_text_object',text:text,oldx:oldx,oldy:oldy,x:x,y:y,text_size:text_size,event_id:event_id},
dataType:"json",
});


request.done(function(data){
self.event_text_objects.forEach(function(el,i){
if(el.name == name && el.x == oldx && el.y == oldy && text_size == text_size){
self.event_text_objects[i].x = x;
self.event_text_objects[i].y = y;
}
});
});

},


remove_section: function(name,x,y,num_of_rows,num_of_seats,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'remove_section',name:name,x:x,y:y,num_of_rows:num_of_rows,num_of_seats:num_of_seats,event_id:event_id},
dataType:"json",
});


request.done(function(data){
console.log(data);
});

},

remove_object: function(name,x,y,height,width,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'remove_object',name:name,x:x,y:y,height:height,width:width,event_id:event_id},
dataType:"json",
});


request.done(function(data){
console.log(data);
});

},


remove_table: function(name,x,y,num_of_seats,event_id){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'remove_table',name:name,x:x,y:y,num_of_seats:num_of_seats,event_id:event_id},
dataType:"json",
});


request.done(function(data){
console.log(data);
});

},


remove_text_object: function(name,x,y,text_size){

var self = this;

var request = $.ajax({
url:"action/event.php",
type:"POST",
data:{action:'remove_text_object',name:name,x:x,y:y,text_size:text_size,event_id:event_id},
dataType:"json",
});


request.done(function(data){
console.log(data);
});

},



get_element_position : function(id){

var pos_left = document.querySelector(id).offsetLeft;
var pos_top = document.querySelector(id).offsetTop;

return {pos_left:pos_left,pos_top:pos_top};

},


drawSectionRow : function(){

},

remove : function(){

}


}