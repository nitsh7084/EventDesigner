# EventDesigner
The Event Designer Script created for Eventdyne(www.amituslab.com/eventdynev2/event-dyne/index.php)

This script allows eventdyne users to design, reposition, resize, print and save events with customized tables, sections, and custom sections such as dance floors, toilet, bathroom etc.

![Alt text](event_designer_final.png?raw=true "The Event Designer")


The container for the design section is wrapped inside an svg element, all the design sections are created with normal divs as their containers, therefore these sections are inserted inside the outer svg container with a foreignElement tag. The script uses JQueryUI for dragging and resizing of design elements. 

The script is initialized by calling the constructor:

new EDEvent(default_height,default_width);

where default_height is the default height for objects, and the default_width is the default width for objects.

more documentation to follow :)