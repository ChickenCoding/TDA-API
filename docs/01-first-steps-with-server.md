---
id: first-steps-with-server
title: First Steps With Server
layout: docs
permalink: /docs/first-steps-with-server.html
prev: getting-started.html
next: account.html
---


# [<i class=icon-anchor></i>](#server)<a name=”server”>First steps with server</a>

## [<i class=icon-anchor></i>](#server-handshake)<a name="server-handshake">Open a connection to the server</a>

First, you will have to connect to the server.
The server uses websockets, and is located at ``ws://thedeveloperadventure.newnorth.technology:32900``.


## [<i class=icon-anchor></i>](#server-request)<a name="server-request">Server Request</a>

To do a request to the server, the format is: 

{% highlight json linenos=table %}
{
    "name": "<request_type>", 
    "data": {
       "<data>"
    }
}
{% endhighlight %}

> You need to parse the message as a __string__, do not send the JSON directly.

## [<i class=icon-anchor></i>](#server-response)<a name="server-response">Server Response</a>

The server will then respond with the following format : 

{% highlight json linenos=table %}
{
    "name": "<request_type">,
    "client": "<ID>", 
    "data": {
        "error": "<true || false>" 
        "errorCode": "<String>",
        "isAvailable": "<true || false>" 
        }
}
{% endhighlight %}

+ ``name`` response will be the same as your ``name`` request

+  ``client`` is the server ID if sent from server, client ID if sent from client

+ ``data.error`` is ``true`` if an error is found, ``false`` if not,

+ ``data.errorCode`` is formated as ``0x00``

+ ``data.isAvailable`` is ``true`` if the username is not yet taken, ``false`` either. 

> ``data`` will also contains the data requested to the server.

