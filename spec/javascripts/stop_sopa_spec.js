describe("#targetSelector", function() {
    it("should default to something reasonable", function(){
        expect(this.sopa.targetSelector()).toBe("header, h1, h2, h3,p, a, li, span, em")
    })
    it("should be configurable", function(){
        this.sopa.targetSelector("p, h2")
        expect(this.sopa.targetSelector()).toBe("p, h2")
    })
});

describe("#sopafy", function(){
    beforeEach(function(){
        this.callback = jasmine.createSpy();
        this.page = $("<body>");
        this.target = $("<div class='sopafy_me'>Hello I am a target for censorship.</div>")
        this.page.append(this.target)
        this.sopa.cookie("__cfduid")
    })
    describe("when there is a CDN cookie, and no censorship cookie", function(){
        beforeEach(function(){
            user.setCookie("__cfduid", "something")
            user.setCookie("cf_sopa", "")
            this.target.sopafy(this.callback)
            this.anchor_tags = $("a.sopafied", this.target)
        })
        it("should wrap some of the text in anchor tags", function(){
            expect(this.anchor_tags.text()).toBe("Hellotargetcensorship")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should fire a callback when clicked", function(){
            $(this.anchor_tags[0]).click();
            expect(this.callback).toHaveBeenCalled();
        })
        it("should set a censorship cookie", function(){
            expect(user.getCookie("cf_sopa")).toBe("true")
        })
        it("should not create a reminder badge", function(){
            expect($("a.sopa_badge").length).toBe(0);
        })

    })
    describe("when there isn't a CDN cookie", function(){
        beforeEach(function(){
            this.target.sopafy(this.callback)
            this.anchor_tags = $("a.sopafied", this.target)
        })
        it("should not wrap the text in anchor tags", function(){
            expect(this.anchor_tags.text()).toBe("")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should create a reminder badge", function(){
            expect($("a.sopa_badge").length).toBe(1);
        })
    })
    describe("when there is a censorship cookie", function(){
        beforeEach(function(){
            user.setCookie("__cfduid", "something")
            user.setCookie("cf_sopa", "true")
            this.target.sopafy(this.callback)
            this.anchor_tags = $("a.sopafied", this.target)
        })
        it("should not wrap the text in anchor tags", function(){
            expect(this.anchor_tags.text()).toBe("")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should create a reminder badge", function(){
            expect($("a.sopa_badge").length).toBe(1);
        })
    })
})

describe("callback", function(){
    beforeEach(function(){
        spyOn($, "liteDialog");
    })
    it("should create a dialog", function(){
        this.sopa.callback();
        expect($.liteDialog).toHaveBeenCalled();
    })
    it("should unsopafy the page", function(){
        this.target = $("<a class='sopafied'>Hello I am a target for censorship.</a>")
        $("#jasmine_content").append(this.target)
        this.sopa.callback();
        expect($("#jasmine_content a.sopafied").length).toBe(0);
        expect($("#jasmine_content").text()).toBe("Hello I am a target for censorship.")
    })
    it("should create a reminder badge", function(){
        this.sopa.callback();
        expect($("a.sopa_badge").length).toBe(1);
    })

})

describe("protestContent", function(){
    describe("default", function(){
        beforeEach(function(){
            this.sopa.twitterHandle("handle")
            this.content = this.sopa.content();
        })
        it("should have a call to action", function(){
            expect(this.content.text()).toContain("Help protect freedom.")
        })
        xit("should have the twitter handle", function(){
            expect(this.content.text()).toContain("handle")
        })

    })
})
