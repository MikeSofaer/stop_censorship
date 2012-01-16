#SOPA

We don't like it.

##What you can do

Put your site on CloudFlare and then add the Stop Censorship application

###What if I'm not on CloudFlare?

To test it out, use this bookmarklet:

```javascript
javascript:try{if(!window.CloudFlare){window.CloudFlare=[];var a=document.createElement("script"),b=document.getElementsByTagName("script")[0];a.type="text/javascript";a.async=!0;a.src="//ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js";b.parentNode.insertBefore(a,b)}}catch(c){};var a=window.CloudFlare;a.push({paths:{stop_censorship:"//ajax.cloudflare.com/cdn-cgi/nexp/apps/"}});a.push(function(b,c){c("stop_censorship/config",function(){return {}});b(["stop_censorship"])});
```

or run this in your browser's console:

```JavaScript
try{if(!window.CloudFlare){window.CloudFlare=[];var a=document.createElement("script"),b=document.getElementsByTagName("script")[0];a.type="text/javascript";a.async=!0;a.src="//ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js";b.parentNode.insertBefore(a,b)}}catch(c){};

var censorshipConfig = {
    
    "twitterHandle" : "MyTwitterHandle",
    "position_x" : "right",
    "selector" : "p, h1, .censor_me"

}

var a=window.CloudFlare;a.push({paths:{stop_censorship:"//ajax.cloudflare.com/cdn-cgi/nexp/apps/"}});a.push(function(b,c){c("stop_censorship/config",function(){return censorshipConfig});b(["stop_censorship"])});
```

If you want to support the efforts to stop American censorship, add this to your page:

```html
<script type="text/javascript"> var CloudFlare = CloudFlare || []; </script>
<script type="text/javascript" src="//ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js" async></script>
<script type="text/javascript">


    var censorshipConfig = {
        
        "twitterHandle" : "MyTwitterHandle", // Your Twitter handle; if not provided, your website domain will be used.
        "position_x" : "right", // Badge position - right or left
        "selector" : "p, h1, .censor_me" // Optional selector for elements to censor. Remove for default.

    }
    
    var a=window.CloudFlare;a.push({paths:{stop_censorship:"//ajax.cloudflare.com/cdn-cgi/nexp/apps/"}});a.push(function(b,c){c("stop_censorship/config",function(){return censorshipConfig});b(["stop_censorship"])});

</script>
```


