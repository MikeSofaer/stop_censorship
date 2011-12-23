describe("#targetSelector", function() {
    it("should default to something reasonable", function(){
        expect(this.sopa.targetSelector()).toBe("header, h1")
    })
    it("should be configurable", function(){
        this.sopa.targetSelector("p, h2")
        expect(this.sopa.targetSelector()).toBe("p, h2")
    })
});

describe("#sopafy", function(){
    beforeEach(function(){
        console.log("Foo");
        this.page = $("<body>");
        this.target = $("<div class='sopafy_me'>Hello I am a target for censorship</div>")
        this.page.append(this.target)
        this.target.sopafy()
        this.anchor_tags = $("a.sopafied", this.target)
        console.info(this.anchor_tags)
        console.info(this.target)
    })
    it("should wrap some of the text in anchor tags", function(){
        console.log(this.anchor_tags)
        expect(this.anchor_tags.text()).toBe("Hello I am a target for censorship")
    })
})
