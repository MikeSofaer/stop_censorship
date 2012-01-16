describe("#targetSelector", function() {
    it("should default to something reasonable", function(){
        expect(this.sopa.config.selector).toBe("header, h1, h2, h3,p, a, li, span, em")
    })
    it("should be configurable", function(){
        this.sopa.config.selector = "p, h2"
        expect(this.sopa.config.selector).toBe("p, h2")
    })
});

describe("#sopafy", function(){
    beforeEach(function(){
        spyOn(this.sopa, "inspirationalDialog")
        this.page = $("<body>");
        this.target = $("<div class='sopafy_me'>Hello I am a target for censorship.</div>")
        this.page.append(this.target)
        this.sopa.config.cookie = "__cfduid"
    })
    describe("when there is a CDN cookie, and no censorship cookie", function(){
        beforeEach(function(){
            user.setCookie("__cfduid", "something")
            user.setCookie("cf_sopa", "")
            this.target.sopafy()
            this.sopa_wrappers = $("span.sopafied", this.target)
        })
        it("should wrap some of the text in anchor tags", function(){
            expect(this.sopa_wrappers.text()).toBe("Hellotargetcensorship")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should fire a inspirationalDialog when clicked", function(){
            $(this.sopa_wrappers[0]).click();
            expect(this.sopa.inspirationalDialog).toHaveBeenCalled();
        })
        it("should set a censorship cookie", function(){
            expect(user.getCookie("cf_sopa")).toBe("true")
        })
        it("should not create a reminder badge", function(){
            expect($(".sopa_badge").length).toBe(0);
        })

    })
    describe("when there isn't a CDN cookie", function(){
        beforeEach(function(){
            this.target.sopafy()
            this.sopa_wrappers = $("span.sopafied", this.target)
        })
        it("should not wrap the text in anchor tags", function(){
            expect(this.sopa_wrappers.text()).toBe("")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should create a reminder badge", function(){
            expect($(".sopa_badge").length).toBe(1);
        })
    })
    describe("when there is a censorship cookie", function(){
        beforeEach(function(){
            user.setCookie("__cfduid", "something")
            user.setCookie("cf_sopa", "true")
            this.target.sopafy()
            this.sopa_wrappers = $("span.sopafied", this.target)
        })
        it("should not wrap the text in anchor tags", function(){
            expect(this.sopa_wrappers.text()).toBe("")
            expect(this.target.text()).toBe("Hello I am a target for censorship.")
        })
        it("should create a reminder badge", function(){
            expect($(".sopa_badge").length).toBe(1);
        })
    })
})

describe("inspirationalDialog", function(){
    beforeEach(function(){
        spyOn($, "liteDialog");
    })
    it("should create a dialog", function(){
        this.sopa.inspirationalDialog();
        expect($.liteDialog).toHaveBeenCalled();
    })
    it("should unsopafy the page", function(){
        this.target = $("<span class='sopafied'>Hello I am a target for censorship.</a>")
        $("#jasmine_content").append(this.target)
        this.sopa.inspirationalDialog();
        expect($("#jasmine_content span.sopafied").length).toBe(0);
        expect($("#jasmine_content").text()).toBe("Hello I am a target for censorship.")
    })
    it("should create a reminder badge", function(){
        this.sopa.inspirationalDialog();
        expect($(".sopa_badge").length).toBe(1);
    })

})

describe("protestContent", function(){
    describe("default", function(){
        beforeEach(function(){
            this.sopa.config.twitterHandle = "handle"
            this.content = this.sopa.protestContent();
        })
        it("should have a call to action", function(){
            expect(this.content.text()).toContain("Help protect freedom.")
        })
        xit("should have the twitter handle", function(){
            expect(this.content.text()).toContain("handle")
        })

    })
})

describe("badge", function(){
    beforeEach(function(){
        this.badge = this.sopa.badge()
    })
    it("should open the dialog", function(){
        spyOn(this.sopa, "inspirationalDialog")
        this.badge.click()
        expect(this.sopa.inspirationalDialog).toHaveBeenCalled()
    })
})

describe("styleSheet", function(){
    beforeEach(function(){
        this.styleSheet = this.sopa.styleSheet()
        $("head").append(this.styleSheet)
    })
    describe("badge", function(){
        beforeEach(function(){
            this.badge = this.sopa.badge()
            $("#jasmine_content").append(this.badge)
        })
        it("should have high z-index", function(){
            expect(this.badge.css("z-index")).toBe("100000")
        })
    })
    afterEach(function(){
        this.styleSheet.remove()
    })
})
