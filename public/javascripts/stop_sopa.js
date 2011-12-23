CloudFlare.define(
    "stop_sopa",
    ["cloudflare/jquery1.7"],
    function($) {

        var selector = "header, h1";

        return {

            targetSelector: function(value) {

                if(value) selector = value;
                else return selector;
            }
        }
    }
);
