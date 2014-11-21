---
id: account
title: Make an account
layout: docs
permalink: /docs/account.html
prev: first-steps-with-server.html
---

# [<i class=icon-anchor></i>](#account)<a name="account">Account</a>

## [<i class=icon-anchor></i>](#account-create)<a name="account-create">Create an account</a>

Following the [Server Request](#server-request) format, the data needed to create an account are :

{% highlight json linenos=table %}
{
    "name": "CreateAccount", 
    "data": {
        "username": "<your_username>" ,
        "password": "<your_password>"
    }
}
{% endhighlight %}

> The server provide a separate method to check if the username is took or not. See [Username availability](#account-username-availability).

## [<i class=icon-anchor></i>](#account-login)<a name="account-login">Login</a>

To login, provide the following format of data :

{% highlight json linenos=table %}
{
    "name": "Login", 
    "data": {
        "username": "<your_username>" ,
        "password": "<your_password>"
    }
}
{% endhighlight %}

## [<i class=icon-anchor></i>](#account-availability) <a name="account-availability">Username availability</a>

To check if a username is took or not, you need to request the server the following data :

{% highlight json linenos=table %}
{
    "name": "UsernameAvailibility", 
    "data": {
        "username": "<your_username>"
    }
}
{% endhighlight %}
