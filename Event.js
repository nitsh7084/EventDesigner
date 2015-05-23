
function EDEvent(rectangles,circles){
this.eventContainer = document.querySelector('#eventContainer');
this.rectangles = rectangles;
this.circles = circles;
this.saveButton = document.querySelector("#saveEventButton");
this.eventOptionObjectsButton = document.querySelector("#event_option_objects");
this.eventObjectsOption = document.querySelector('.event_objects_option');
this.eventObjectsOptionContainer = document.querySelector(".event_objects_option_container");
this.eventPlannerContainer = document.querySelector('.eventPlannerContainer');
this.eventLowerListItem = Array.prototype.slice.call(document.querySelectorAll('.eventLowerListItem'));
this.eventTableCancelButton = document.querySelector('.table_cancel_button');
this.eventTableCreateButton = document.querySelector('#event_table_create_button');
this.eventNewItemContainer = document.querySelector('.event_new_item_container');
this.eventSections = new Array();
this.eventTables = new Array();
this.eventObjects = new Array();
this.eventTextObjects = new Array();
this.eventId = document.querySelector('.event_id_container').innerHTML;
this.eventId = this.eventId.trim();
this.eventName = document.querySelector('.event_name_container').innerHTML;
this.eventName = this.eventName.trim();
this.databaseObject = new EventDB(this.eventName);
this.init();
}

EDEvent.prototype = {

init : function(){
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

this.eventObjectsOption.addEventListener('click',function(){
var option_item = this.getAttribute("data-option-item");
var option_item_container = document.createElement('div');

switch(option_item){
case 'stage':
option_item_container.innerHTML = 'Stage';
option_item_container.classList.add("class","option_stage_container");
break;

case 'dance':
option_item_container.innerHTML = 'Dance';
option_item_container.classList.add("class","option_dance_container");
break;
}

option_item_container.classList.add("class","option_item_container");
option_item_container.classList.add("class","event_resizable");
option_item_container.classList.add("class","event_draggable");
self.eventPlannerContainer.appendChild(option_item_container);
self.eventObjectsOptionContainer.classList.remove('show');

});

this.eventTableCancelButton.addEventListener('click',function(){
document.querySelector('.event_new_table_container').classList.remove('show');
});

this.eventTableCreateButton.addEventListener('click',function(){
console.log('event table create button');
var num_of_seats = document.querySelector('#event_new_table_seats').innerHTML;
num_of_seats.trim();
num_of_seats = num_of_seats.replace(/^\s+|\s+$/g,'');
self.create_table(num_of_seats);
document.querySelector('.event_new_table_container').classList.remove('show');
});


document.querySelector('#eventCreateSectionButton').addEventListener('click',function(){
var num_of_rows = document.querySelector('#event_new_section_rows').innerHTML;
var section_name = document.querySelector('#event_new_section_name').value;
var num_of_seats = document.querySelector('#event_new_section_seats').innerHTML;
self.create_event_section(section_name,num_of_rows,num_of_seats);
document.querySelector('.event_new_section_container').classList.remove('show');
});

},

drawCircleSeats : function(num,x,y){
var seats_coords = new Array();
var cr = 0;
console.log('x: '+x+' y: '+y+' num:'+num);
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
foreignElement.setAttribute("x","40");
foreignElement.setAttribute("y","40");
foreignElement.setAttribute("height","800");
foreignElement.setAttribute("width","800");

var eventTableSeatsItemContainer = document.createElement('div');
eventTableSeatsItemContainer.setAttribute("class","eventTableSeatsItemContainer");
eventTableSeatsItemContainer.setAttribute("class","event_draggable");
eventTableSeatsItemContainer.style.position = "absolute";
eventTableSeatsItemContainer.style.top = "0px";
eventTableSeatsItemContainer.style.left = "0px";
eventTableSeatsItemContainer.style.height = "800px";
eventTableSeatsItemContainer.style.width = "800px";

var innerSvgContainer = document.createElementNS(this.svgns,"svg");
innerSvgContainer.setAttribute("height","800");
innerSvgContainer.setAttribute("width","800");

eventTableSeatsItemContainer.appendChild(innerSvgContainer);

var bigCircle = document.createElementNS(this.svgns,"circle");
bigCircle.setAttribute("r",cr);
bigCircle.setAttribute("fill","#3498db");
bigCircle.setAttribute("cx",300);
bigCircle.setAttribute("cy",250);
bigCircle.setAttribute("stroke","#fff");
bigCircle.setAttribute("stroke-width","3");
innerSvgContainer.appendChild(bigCircle);

for(var i=0;i<num;i++){
console.log(seats_coords);
var cx = seats_coords[i]['x'];
var cy = seats_coords[i]['y'];
var smallcircle = document.createElementNS(this.svgns,"circle");
smallcircle.setAttribute("r",15);
smallcircle.setAttribute("fill","#3498db");
smallcircle.setAttribute("stroke","#fff");
smallcircle.setAttribute("stroke-width","3");
smallcircle.setAttribute("cx",cx);
smallcircle.setAttribute("cy",cy);
innerSvgContainer.appendChild(smallcircle);
}

foreignElement.appendChild(eventTableSeatsItemContainer);
this.svgContainer.appendChild(foreignElement);
$('.event_draggable').draggable();

},

drawBigCircle : function(){
},

drawElements : function(){

this.drawBigCircle();
this.drawCircleSeats(5,300,250);
//this.drawRectangle();

},

saveElements : function(){

this.rectangles.forEach(function(el,i){
console.log(el.x);
});

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
this.svgContainer.setAttribute("height",462);
this.svgContainer.setAttribute("width",1100);
this.svgContainer.setAttribute("fill","green");
this.svgContainer.setAttribute("id","event_planner_svg_container");
this.eventPlannerContainer.appendChild(this.svgContainer);
},


showEvent : function(event_name){

},


create_table : function(num){
this.drawCircleSeats(num,300,250);
},


create_event_section : function(text,num_of_rows,num_of_seats){
console.log('create event section');
var section_x = 20;
var section_y = 20;
var eventTableSeatsItemContainer = document.createElement('div');
eventTableSeatsItemContainer.setAttribute("class","eventTableSeatsItemContainer");
eventTableSeatsItemContainer.setAttribute("class","event_draggable");
eventTableSeatsItemContainer.style.position = "absolute";
eventTableSeatsItemContainer.style.top = "0px";
eventTableSeatsItemContainer.style.left = "0px";
eventTableSeatsItemContainer.style.height = "800px";
eventTableSeatsItemContainer.style.width = "800px";


var foreignObject = document.createElementNS(this.svgns,"foreignObject");
foreignObject.setAttribute("x",section_x);
foreignObject.setAttribute("y",section_y);
foreignObject.setAttribute("height","800");
foreignObject.setAttribute("width","800");

var innerSvgContainer = document.createElementNS(this.svgns,'svg');
innerSvgContainer.setAttribute("height","800");
innerSvgContainer.setAttribute("width","800");
// create section text

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
section_circle.setAttribute("stroke","#3498db");

innerSvgContainer.appendChild(section_circle);
}
}


innerSvgContainer.appendChild(section_text_container);
eventTableSeatsItemContainer.appendChild(innerSvgContainer);
foreignObject.appendChild(eventTableSeatsItemContainer);
this.svgContainer.appendChild(foreignObject);
this.databaseObject.add_section(text,section_x,section_y,num_of_rows,num_of_seats,this.eventId);

},


drawSectionRow : function(){

},

remove : function(){

}


}
