beforeEach(function() {
    this.sopa = null;
    var self = this;

    var promise = CloudFlare.require(["stop_censorship","cloudflare/jquery1.7", "cloudflare/user"],
        function(stop_censorship, $, user){
            self.sopa = stop_censorship;
            window.$ = $
            window.user = user
        }
    )

    waitsFor(function(){
        return this.sopa !== null;
    })
});

afterEach(function(){
    user.setCookie("__cfduid", "")
    user.setCookie("cf_sopa", "")
    $(".sopa_badge").remove()
    this.sopa.config.cookie = null
})
