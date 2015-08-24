# EventDesigner
An Event Designer Script, supports creating tables, sections, objects and custom text objects for your next event.

[TRY THE EDITOR](http://amituslab.com/event_planner/design_event.php?event_url=myeventsix)

## Features

This script allows eventdyne users to design, reposition, resize, print and save events with customized tables(width upto 20 seats), sections, and custom sections such as dance floors, toilet, bathroom etc.

![Alt text](event_designer_final.png?raw=true "The Event Designer")

##How it's built
The container for the design section is wrapped inside an svg element, all the design sections are created with normal divs as their containers, therefore these sections are inserted inside the outer svg container with a foreignElement tag. The script uses JQueryUI for dragging and resizing of design elements. 

##How to use
The script is initialized by calling the constructor:

```javascript
new EDEvent(default_height,default_width);
```

where default_height is the default height for objects, and the default_width is the default width for objects.

more documentation to follow :)