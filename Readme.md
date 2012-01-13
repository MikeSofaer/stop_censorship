#SOPA

We don't like it.

##What you can do

Put your site on CloudFlare and then add the Stop SOPA application

###What if I'm not on CloudFlare?

Add this to your page:

    <script src='http://ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js'></script>
    <script type='text/javascript'>
        CloudFlare.require(['cloudflare/stop_sopa'], function(sopa){
            sopa.twitterHandle = "YOUR_HANDLE"
            sopa.sopafy();
        })
    </script>
