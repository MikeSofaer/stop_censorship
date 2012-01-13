#SOPA

We don't like it.

##What you can do

Put your site on CloudFlare and then add the Stop SOPA application

###What if I'm not on CloudFlare?

Add this to your page:

    <script src='http://ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js'></script>
    <script src='https://raw.github.com/MikeSofaer/stop_sopa/master/public/javascripts/stop_sopa.js'></script>
    <script type="text/javascript">
        CloudFlare.push({
            "paths" : {
                "cloudflare" : "http://ajax.cloudflare.com/cdn-cgi/nexp/"
            }
        });
        CloudFlare. require(['cloudflare/stop_sopa'], function(sopa){
                sopa.targetSelector("h1, p, h2, a")
                sopa.twitterHandle('YOUR_HANDLE')
                sopa.activate();
            })
    </script>

Or run this:

        if(!window.CloudFlare) {
            window.CloudFlare = [];
            (function() {
                var cfjs = document.createElement('script'),
                cursor = document.getElementsByTagName('script')[0];
                cfjs.type = 'text/javascript';
                cfjs.async = true;
                cfjs.src = '//ajax.cloudflare.com/cdn-cgi/nexp/cloudflare.js';
                cursor.parentNode.insertBefore(cfjs, cursor);
            })();
        }
        CloudFlare.push({"paths" : {
                "stop_sopa" : "https://raw.github.com/MikeSofaer/stop_sopa/master/public/javascripts/"
            }});

        CloudFlare.push(function(require){
            require(['stop_sopa'], function(sopa){
                sopa.targetSelector("h1, p, h2, a")
                sopa.twitterHandle('YOUR_HANDLE')
                sopa.activate();
            })
        });

