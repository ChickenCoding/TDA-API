
# The Developer Adventure

Table of contents
----
  1. [About The Developer Adventure](#about)
  2. [Getting started with The Developer Adventure](#getting-started)
    1. [Open a connection to the server](#server-handshake)
    2. [Server Request](#server-request)
    3. [Server Response](#server-response)
  3. [Account](#account)
    1. [Create an account](#account-create)
    2. [Login](#account-login)
    3. [Account Availibility](#account-availibility)

# <a name="about">About The Developer Adventure</a>

The Developer Adventure is a sandbox game where the players are able to develop their own interfaces to 
the game by communicating with the servers themselves. Players are also able to explore the world by 
developing AI and other cool things to interact with the world.

# <a name="getting-started">Getting started with The Developer Adventure</a>

## <a name="server-handshake">Open a connection to the server</a>

First, you will have to connect to the server.
The server uses websockets, and is located at ``ws://thedeveloperadventure.newnorth.technology:32900``.


## <a name="server-request">Server Request</a>

To do a request to the server, the format is: 

```json
{
    "name": "<request_type>", 
    "data": {
       "<data>"
    }
}
```

> You need to parse the message as a __string__, do not send the JSON directly.

## <a name="server-response">Server Response</a>

The server will then respond with the following format : 

```json
{
    "name": "<request_type">,
    "client": "<ID>", 
    "data": {
        "error": "<true || false>" 
        "errorCode": "<String>",
        "isAvailable": "<true || false>" 
        }
}
```

+ ``name`` response will be the same as your ``name`` request

+  ``client`` is the server ID if sent from server, client ID if sent from client

+ ``data.error`` is ``true`` if an error is found, ``false`` if not,

+ ``data.errorCode`` is formated as ``0x00``

+ ``data.isAvailable`` is ``true`` if the username is not yet taken, ``false`` either. 

> ``data`` will also contains the data requested to the server.

# <a name="account">Account</a>

## <a name="account-create">Create an account</a>

Following the [Server Request](#server-request) format, the data needed to create an account are :

```json
{
    "name": "CreateAccount", 
    "data": {
        "username": "<your_username>" ,
        "password": "<your_password>"
    }
}
```

> The server provide a separate method to check if the username is took or not. See [Username availability](#account-username-availability).

## <a name="account-login">Login</a>

To login, provide the following format of data :

```json
{
    "name": "Login", 
    "data": {
        "username": "<your_username>" ,
        "password": "<your_password>"
    }
}
```

## <a name="account-username-availibility">Username availability</a>

To check if a username is took or not, you need to request the server the following data :

```json
{
    "name": "UsernameAvailibility", 
    "data": {
        "username": "<your_username>"
    }
}
```

