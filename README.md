#BUST-E-MOJI


![Bust-e-moji](https://raw.githubusercontent.com/cameragadget/project1/gh-pages/assets/bustmoj.png)

###Or:
###how I learned to stop worrying and love the bugs

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


![MainInt](https://raw.githubusercontent.com/cameragadget/project1/master/assets/MainInt.png)

* Finding Clustered bubbles in an offset grid of hexagonal positioning: This was one of the biggest challenges of the game.  Because every odd row is indented by half of a bubble length there is no obvious grid for finding neighboring bubbles. Arrays were created representing the neighboring row/column offsets in order to acurately determine which bubbles are touching:

	var evenRowTouching = [[-1,-1], [-1,0], [0,-1], [0,1], [1,-1], [1,0]];
	
	var oddRowTouching = [[-1,0], [-1,1], [0,-1], [0,1], [1,0], [1,1]];

in order to determine relationships between neighboring bubbles we need to run each bubble in question through a function that checks the tile.type of of every bubble around it, depositing matches in an array to then be run through again to determine if any of its neighbors are matches and so on and so on until no neigboring bubbles are found to be a match.

![findmatch](https://raw.githubusercontent.com/cameragadget/project1/master/assets/findmatch.png)

* Player bubble in motion:  In order for this game to emulate the arcade version, the player must be able to fire their emoji from the launch area and have it travel in their intended direction, bouncing off the playfiend edges if coming into contact with them.  First we find the mouse angle by finding the X/Y coordinates of the cursor on the canvas using an event listener, then we calculate the angle of the line between the player bubble location and the mouse and draw it by calculating the sin/cos values 

 ![mouseAngle](https://raw.githubusercontent.com/cameragadget/project1/master/assets/mouseAngle.png)
 
* now that we have the mouse angle we introduce motion to our player bubble by calculating the speed of the bubble * the X/Y direction of travel to determine where the bubble will travel along its trajectory and redrawing it at an interval that implies motion.
 
 ![movePlayer](https://raw.githubusercontent.com/cameragadget/project1/master/assets/movePlayer.png)
 
 * Collision Detection:  Now that the emoji is in motion, how do we know when it comes into contact with another emoji and stops moving?  We know the X/Y coordinates of the player bubble in motion. We know the X/Y coordinates of every bubble in the playfield. And we know the radius of each bubble. With this in mind we run a loop through every X/Y coordinate of every bubble. If the distance between the player bubble and any other bubble becomes less than the sum of their two radii, we have a collision!

 ![collision](https://raw.githubusercontent.com/cameragadget/project1/master/assets/collision.png)
 
 * But Wait! There's More!  Now that we know the player bubble has collided with the game board, we have to now calculate, based on the X/Y coordinates of the center of the player buble, where to insert the player bubble into our array of tiles.  We do this by plugging the X/Y coordinates into a function that accounts for odd/even row offset, and finds that row/column value equivalent, rounding up, of those coordinates.  

![closesttile](https://raw.githubusercontent.com/cameragadget/project1/master/assets/closest.png)

 *Now that we have those we simply change the tile.type of the empty tile to that of the player bubble and make the player bubble disapear, thus 'snapping' it into place!
 
 ---
#Design Approach:

When setting out to build this game I had to look at the structure and dimensions of the playing field as well as the clustering nature of the emojis.  It was decided that the best approach was to have 13 fillable rows of ten emojis each, with 5 randomly generated emojis to fill the game board for the first 5 rows. Emoji's were chosen rather than generating bubbles of my own because they are already round, easily recognizable by both individual design and color, and because they are readily available as .png files with clear backgounds. An attempt was made to try to stay close to the source material of the game:

![puzzleBobble](https://raw.githubusercontent.com/cameragadget/project1/master/assets/puzzle-bobble.jpg)


![wireframe](https://raw.githubusercontent.com/cameragadget/project1/master/assets/wireframe.JPG)
(I don't get it, this photo is portrait in the raw on github)

This game is more complicated that I originally envisioned it being.  I tried to hold as close to the game as possible by keeping as many of the original rules as possible.

![wireframe2](https://raw.githubusercontent.com/cameragadget/project1/master/assets/wireframe2.JPG)

---

##Installation Instructions:

This game is available to play at:

<http://cameragadget.github.io/project1>

although there appears to be a compatibility issue with retina display macs that will be addressed in a future update.

There is no downloading or installation necessary to play.  However, the source files are available at 

<https://github.com/cameragadget/project1>

The game reqires:

* index.html
* js directory
* css directory
* assets directory

---

#blockers and unsolved problems:

This game posed quite a challenge of math and logic and unfortunately certain features had to be left behind.

### omissions, bugs, and planned future features:

One of the major components of gameplay in Bust-A-Move is that when bubbles are left free floating, they fall away and points are awarded.  Unfortunately I was not able to implement this feature successfully and have plans to include it in a future update.

####known bugs to be addressed in future updates include:
* occasionally a player emoji will be absorbed into an existing playfield bubble instead of sticking to an empty spot
* sometimes the scoring overpays for more bubbles than were eliminated
* BIZARRO MODE: if the mouse is clicked multiple times on launch, the player bubble behaves erratically and breaks the game in spectacular fashion that is incredibly entertaining for the user and incredibly frustrating for the developer.


other future improvements include:

* free-floating bubbles fall away
* adding a row of bubble at the top of the game every 15 moves
* music and sound effects
* an on-deck spot to visualize the next bubble up for the player to be able to plan ahead
* multiple levels
* puzzle mode
* a function that prevents player bubbles from being generated into pieces that are no longer present on the board.

----
User stories available on Trello at:

<https://trello.com/b/SA9Qzu6V/project-1-bust-a-move>



---
---
---

![WDIrollercoaster](https://raw.githubusercontent.com/cameragadget/project1/master/assets/WDIrollercoaster.JPG)

