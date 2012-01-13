beforeEach(function() {
    this.sopa = null;
    var self = this;

    var promise = CloudFlare.require(["stop_sopa"], function(sopa){
        self.sopa = sopa;
    })

    waitsFor(function(){
        return this.sopa !== null;
    })
});

afterEach(function(){
    user.setCookie("__cfduid", "")
    user.setCookie("cf_sopa", "")
    $("a.sopa_badge").remove()
})
