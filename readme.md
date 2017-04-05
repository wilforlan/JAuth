# JAuth for Web API Authentication

What is JAuth: JAuth is a Token based Authentication process manager for Express APIs. Very simple and Easy to use.

### USAGE

JAuth is a very easy to use Library. You should install with command:


  **npm install jauth**

Include in project like so:

```javascript
  var jauth = require("jauth");
```
***Using in project***

Since its middle ware that sits in our application. It can be used like so:

Using the auth.secure() method
```javascript
app.use(auth.secure({
  token: 'enter token here',
  secret:'enter secret here',
  identifier: 'enter identifier here',
}));
```
Options are passed to the method. This Options are the API Auth Credientials. Which the client should send
as request headers to validate the request.

### Sample

From client:

  ```javascript
      var config = {
        headers:  {
            'Accept': 'application/json;odata=verbose',
            "X-API-SECRET" : "d2VudHdvcnRobWFuOkNoYW5nZV9tZQ",
            "X-API-TOKEN" : "euhYSuhsVaysYdtyriurui"
            "X-API-IDENTIFIER" : "zVadfYRYjgdjbfhgGyGYGFh"
        }
    };

    $http.get("/api/getsomedata", config);

    ```
Then on server, you would have:

```javascript
app.use(auth.secure({
  token: 'enter token here',
  secret:'enter secret here',
  identifier: 'enter identifier here',
}));
```

You could use it as route specific middleware.

# Use Cases:

*To verify an admin route*
You can have:

```javascript
var isAdmin = auth.secure({
  token: 'enter token here',
  secret:'enter secret here',
  identifier: 'enter identifier here',
});

app.get("/getMember/:id", isAdmin, function(req, res){
  doSomthing();
})
```

The Example above can be used to verify access levels.

###TO DO

- Create DB Authentication to Validate Database API Access.
- Implement OAuth, Digest Auth and Basic Auth methods.

**How to Support**

Fork, Create pull requests, open issues and help improve code base.

**License**
MIT
