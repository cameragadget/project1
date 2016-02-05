#BUST-E-MOJI


![Bust-e-moji](https://raw.githubusercontent.com/cameragadget/project1/gh-pages/assets/bustmoj.png)

###Or:
###how I learned to stop worrying and love the math

![strangelove](http://www.newyorker.com/wp-content/uploads/2014/01/dr-strangelove-still-580.jpg)


==

Bust-E-Moji is a single player puzzle shooter game based on the 1994 SNK game Puzzle Bobble by Taito.  It was released to the US market as Bust-a-move and was later emulated/ripped off by the game Snood in the early 2000s.

***


###Main Objectives: 

Players try to empty the game board by matching colored sprites in groups of three or more to make them pop and disappear, clearing the way to access pieces buried deeper in the game.

Aiming is accomplished by moving the cursor over the playfield to point the cannon and launch the player bubble at the matching targets at the top of the field.

when the player bubble hits the puzzle bubbles it sticks in place, popping the cluster if it has formed three or more or remaining in place if not.

if a player has a tricky lie to get to their shot, they are able to bounce the ball off of the walls of the playfield to achieve bank shots.

both the playfield and player ball are generated randomly, meaning that every game will be different than the last!

***

##Main Technologies Used  

This game relies heavily on the HTML5 Canvas used to draw graphics and animations using JavaScript.

This project is built almost entirely on a backbone of JavaScript and Canvas utilizing DOM manipulation and feedback reponse collision events.

### Examples of technologies employed:

* Canvas:  Canvas was chosen as a skeleton for this project because it creates a versatile framework to create dynamic interactive user environments where objects can be moved, manipulated, and interacted with by the user without the need to complicated game engines or plugins.  Using canvas means that the entirety of the game resides within one line of HTML:
   
	``<canvas id="mainCanvas" width="525" height="650"></canvas>``
	
	the rest of the game happens behind the scenes in the JavaScript....
	
* Interval Functions:  Because this game includes animation frame by frame on top of existing animation, it is necessary to refresh the canvas often to prevent smearing or paintbrush effects from moving components.  The result is needing to call multiple functions quickly and often, this is done using intervals:


![MainInt]()

* Finding Clustered bubbles in an offset grid of hexagonal positioning: This was one of the biggest challenges of the game.  















this process will be detailed in the following README as well as on Trello at: <https://trello.com/b/SA9Qzu6V/project-1-bust-a-move>

##User Stories:

