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
