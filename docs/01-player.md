---
id: player
title: Player
layout: docs
permalink: /docs/player.html
prev: account.html
next: levelling.html
---

# [<i class=icon-anchor></i>](#player)<a name=player>Player</a>

## [<i class=icon-anchor></i>](#player-movements)<a name=player-movements>Player Movements</a>

### [<i class=icon-anchor></i>](#player-movements-walk)<a name=player-movements-walk>Walking</a>

Make the character walk in a direction, between 2 availables :

{% highlight json linenos=table %}
{
	"name": "Walk",
	"data": {
		 "direction": "Right|Left"
	}
}
{% endhighlight %}


### [<i class=icon-anchor></i>](#player-movements-turn)<a name=player-movements-turn>Face directions</a>

Make the character turn in a direction between 2 availables :

{% highlight json linenos=table %}
{
	"name": "Turn",
	"data": {
		 "direction": "Right|Left"
	}
}
{% endhighlight %}

## [<i class=icon-anchor></i>](#player-action)<a name=player-action>Player action</a>

### [<i class=icon-anchor></i>](#player-action-look)<a name=player-action-look>Look</a>

Make the character look at the current character position :

{% highlight json linenos=table %}
{
	"name": "Look"
}
{% endhighlight %}

### [<i class=icon-anchor></i>](#player-action-read)<a name=player-action-read>Read</a>

Make the character read an item :

{% highlight json linenos=table %}
{
	"name": "Read",
    "data": {
		 "item": "itemName"
	}
}
{% endhighlight %}

### [<i class=icon-anchor></i>](#player-action-take)<a name=player-action-take>Take</a>

Make the character take an item :

{% highlight json linenos=table %}
{
	"name": "Take",
    "data": {
		 "item": "itemName"
	}
}
{% endhighlight %}

### [<i class=icon-anchor></i>](#player-action-drop)<a name=player-action-drop>Drop</a>

Make the character drop an item :

{% highlight json linenos=table %}
{
	"name": "Drop",
    "data": {
		 "item": "itemName"
	}
}
{% endhighlight %}