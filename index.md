---
layout: default
id: home
hero: true
---

# HomePage

This is the API website.


## Changelog

{% highlight verilog %}


Version 0.1.1

Had a super sweet live stream session tonight, much thanks to a person at Mojang tweeting about the game, 
so I had tons of new viewers comming with input and thoughts about the game.

Fixed bugs:
- When turning to an incorrect direction, it said you turned to it, even though you didn't.
- When turning to an incorrect direction, it displayed a generic error, instead of saying it's an invalid action.
- When moving in an incorrect direction, it displayed a generic error, instead of saying it's an invalid action.

Changes:
- The map is now made up with hexagon tiles rather than square tiles.
- Changed "move <direction>" to "walk <direction>".
- Changed "inventory use <item>" to "use <item>".

New features:
- Added the "look"-command.
- Added the "read"-command.
- Added a "Quest board"-item.
- Added an "Apple pie"-item.
- Added "IsCarryable"-property to items.
- Added "Read"-method to items.
- Added the "drop"-command.
- Added the "take"-command.
- Added "Map"-item.
- Added "Quest journal"-item.
- Added an overlay that creates the feeling of an old CRT, sort of.
- Added "> " to indicate that the user should write something.

Hexagon map tiles:
- I've made the choice to have hexagon tiles instead of square tiles since I think it will bring greater depth to the battle tactics later, 
also it looks a lot sweeter when doing something graphical for it.


Version 0.1.0

Fixed bugs:
- Backspace now works in Google Chrome.
- Case insensitive when trying to use item in inventory.
- System now tells user what's the problem if item isn't found in inventory, instead of a generic error message.

New features:
- Added "help"-command.
- Added ctrl+c to abort current process.
- Added attributes to the players character.
- Added phobias to the players character.
- Added "attributes view"-command
- Added "phobias view"-command

Attributes:
- The characters attributes will be working in a fashion similar to D&D, it will help the characters chances to perform certain actions 
as well as increase passive bonuses. The game will not have a typical system for levelling, instead attributes will be increased 
temporarily depending on what the player has been doing lately. That way, it's all based on what the player does and how much it 
has been done, and if the player would be inactive for a while or just not use certain skills, the attributes will slowly change 
back again.
- Initial value is 10, minimum value is 1 and maximum value is 99.

Phobias:
- The characters phobias is a lot like attributes, but works in a negative fashion. For example, a high level of rhabdophobia will 
increase the character's chance to be influenced by magic or panic in the precense of magic. A high level thanatophobia might 
cause the player to panic in battle when wounded.
- Initial value is 5, minimum value is 1 and maximum value is 9.


{% endhighlight %}
