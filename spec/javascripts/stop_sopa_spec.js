describe("#targetSelector", function() {
    it("should default to something reasonable", function(){
        expect(this.sopa.targetSelector()).toBe("header, h1")
    })
    it("should be configurable", function(){
        this.sopa.targetSelector("p, h2")
        expect(this.sopa.targetSelector()).toBe("p, h2")
    })
});
