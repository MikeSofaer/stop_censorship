beforeEach(function() {
    this.sopa = null;
    var self = this;

    var promise = CloudFlare.require(["stop_censorship","cloudflare/jquery1.7", "cloudflare/user"],
        function(stop_censorship, $, user){
            self.sopa = stop_censorship;
            self.user = user
            window.$ = $
        }
    )

    waitsFor(function(){
        return this.sopa !== null;
    })
});

afterEach(function(){
    this.user.setCookie("__cfduid", "")
    this.user.setCookie("cf_sopa", "")
    $(".sopa_badge").remove()
    this.sopa.config.cookie = null
})
