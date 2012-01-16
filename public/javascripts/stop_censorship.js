CloudFlare.define(
    "stop_censorship",
    ["cloudflare/jquery1.7", "cloudflare/user", "cloudflare/dom", "cloudflare/path", "cloudflare/console", "stop_censorship/config"],
    function($, user, dom, path, console, _config) {

        var SopaProtest = function SopaProtest(config){
            var self=this
            self.config = config
            if (config.onCloudflare) {
                self.cookie = "__cfduid"
            }
        }

        var cdnPath = "//ajax.cloudflare.com/cdn-cgi/nexp/";

        var config = $.extend({
            selector : "header, h1, h2, h3, p, li, span, em",
            position_x : "right",
            onCloudflare : false,
            regex : '.{5}'
        }, _config)

        config.regex = new RegExp(config.regex)

        var sopaProtest = new SopaProtest(config)

        //jquery.liteDialog
        ;(function(a){var p="hyLite";function c(e){e.keyCode===27&&a.liteDialog("hide")}var d={init:function(e){var b={html:"",modal:!1,shadow:"#000",shadowRadius:"25px",background:"#FFF",color:"#000",width:"300px",padding:"10px",zIndex:9000};e&&a.extend(b,e);a("#"+p+"Shdw").length===0&&a("<div id='"+p+"Shdw' style='position:fixed;top:0;left:0;'>").hide().css({height:a(document).height(),width:a(document).width()}).appendTo(document.body);a("#"+p+"Dlg").length===0&&a("<div id='"+p+"Dlg' style='position:absolute;'>").hide().appendTo(document.body); a("#"+p+"Shdw").css({background:b.shadow,'z-index':b.zIndex}).fadeTo("fast",0.4);a("#"+p+"Dlg").html(b.html).width(b.width).css({"box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-moz-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-webkit-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,color:b.color,background:b.background,padding:b.padding,top:(a(window).height()-a("#"+p+"Dlg").outerHeight())/2+a(window).scrollTop(),left:(a(window).width()-a("#"+p+"Dlg").outerWidth())/2+a(window).scrollLeft(),'z-index':b.zIndex}).fadeIn(); b.modal?(a("#"+p+"Shdw, #"+p+"Dlg").unbind(),a(document).unbind("keyup",c)):(a("#"+p+"Shdw, #"+p+"Dlg").click(function(){a.liteDialog("hide")}),a(document).keyup(c))},hide:function(){a("#"+p+"Shdw, #"+p+"Dlg").fadeOut()}};a.liteDialog=a.fn.liteDialog=function(a){return d[a]?d[a].apply(this,Array.prototype.slice.call(arguments,1)):typeof a==="object"||!a?d.init.apply(this,arguments):d.init.apply(this,[{html:a}])}})($);


        $.extend(SopaProtest.prototype, {
            badge : function(){
                var self = this,
                    side = /^right$|^left$/i.test(self.config.position_x) ? self.config.position_x.toLowerCase() : 'right';

                return $("<img src='" + cdnPath + "images/badge.png' class='sopa_badge _cf_censorship_" + side + (dom.internetExplorer < 9 ? " ie" : "") + "'>")
                            .bind("click", function(){ self.inspirationalDialog() })
            },
            placeBadge : function(){
                $("body").append(this.badge())
            },

            tweetWindow : function(options) {
                window.open(
                    "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fcloudflare.com"+
                    "&text="+encodeURIComponent(options.text)+
                    "&url="+encodeURIComponent(options.url)+
                    "&hashtags="+encodeURIComponent(options.hashtag)+
                    "&via=cloudflare",
                    "_blank",
                    "height=450,left=445,personalbar=0,resiable=1,scrollbars=1,toolbar=0,top=225,width=550"
                );
            },

            senatorDropdown: function(){
                var senators =[["AK","Lisa Murkowski","907-456-0233"],["AK","Mark Begich","907-271-5915"],["AL","Jefferson Sessions","334-244-7017"],["AL","Richard Shelby","205-759-5047"],["AR","John Boozman","479-725-0400"],["AR","Mark Pryor","501-324-6336"],["AZ","Jon Kyl","602-840-1891"],["AZ","John McCain","602-952-2410"],["CA","Barbara Boxer","510-286-8537"],["CA","Dianne Feinstein","415-393-0707"],["CO","Michael Bennet","303-455-7600"],["CO","Mark Udall","303-650-7820"],["CT","Richard Blumenthal","860-258-6940"],["CT","Joseph Lieberman","860-549-8463"],["DE","Thomas Carper","302-573-6291"],["DE","Chris Coons","302-573-6345"],["FL","Bill Nelson","407-872-7161"],["FL","Marco Rubio","305-418-8553"],["GA","C. Saxby Chambliss","770-763-9090"],["GA","John Isakson","770-661-0999"],["HI","Daniel Akaka","808-522-8970"],["HI","Daniel Inouye","808-541-2542"],["IA","Charles Grassley","515-288-1145"],["IA","Thomas Harkin","515-284-4574"],["ID","Michael Crapo","208-334-1776"],["ID","James Risch","208-342-7985"],["IL","Richard Durbin","312-353-4952"],["IL","Mark Kirk","312-886-3506"],["IN","Daniel Coats","317-554-0750"],["IN","Richard Lugar","317-226-5555"],["KS","Pat Roberts","913-451-9343"],["KY","Mitch McConnell","502-582-6304"],["KY","Rob Portman","361-576-1231"],["LA","Mary Landrieu","225-389-0395"],["LA","David Vitter","337-262-6898"],["MA","Scott Brown","617-565-3170"],["MA","John Kerry","617-565-8519"],["MD","Barbara Mikulski","410-962-4510"],["ME","Susan Collins","207-945-0417"],["ME","Olympia Snowe","207-874-0883"],["MI","Carl Levin","313-226-6020"],["MI","Debbie Stabenow","517-203-1760"],["MN","Al Franken","651-221-1016"],["MN","Amy Klobuchar","612-727-5220"],["MO","Roy Blunt","816-471-7141"],["MO","Claire McCaskill","816-421-1639"],["MS","Thad Cochran","601-965-4459"],["MS","Roger Wicker","601-965-4644"],["MT","Max Baucus","406-657-6790"],["MT","Jon Tester","406-449-5401"],["NC","Richard Burr","910-251-1058"],["NC","Kay Hagan","336-333-5311"],["ND","Kent Conrad","701-258-4648"],["ND","John Hoeven","701-250-4618"],["NE","Mike Johanns","308-632-6032"],["NE","E. Benjamin Nelson","402-441-4600"],["NH","Kelly Ayotte","603-622-7979"],["NH","Jeanne Shaheen","603-647-7500"],["NJ","Frank Lautenberg","973-639-8700"],["NJ","Robert Menendez","973-645-3030"],["NM","Jeff Bingaman","505-346-6601"],["NM","Tom Udall","505-346-6791"],["NV","Dean Heller","775-686-5770"],["NV","Harry Reid","702-388-5020"],["NY","Kirsten Gillibrand","212-688-6262"],["NY","Charles Schumer","212-486-4430"],["OH","Sherrod Brown","216-522-7272"],["OK","James Inhofe","918-748-5111"],["OK","Tom Coburn","918-581-7651"],["OR","Jeffery Merkley","503-326-3386"],["PA","Robert Casey","570-941-0930"],["PA","Pat Toomey","610-434-1444"],["RI","John Reed","401-943-3100"],["RI","Sheldon Whitehouse","401-453-5294"],["SC","Jim DeMint","864-233-5366"],["SC","Lindsey Graham","864-250-1417"],["SD","Tim Johnson","414-276-7282"],["SD","John Thune","605-334-9596"],["TN","Lamar Alexander","615-736-5129"],["TN","Bob Corker","423-756-2757"],["TX","John Cornyn","512-469-6034"],["TX","Kay Hutchison","214-361-3500"],["UT","Orrin Hatch","801-524-4380"],["UT","Mike Lee","801-524-5933"],["VA","Mark Warner","804-775-2314"],["VA","James Webb","804-771-2221"],["VT","Patrick Leahy","802-863-2525"],["VT","Bernard Sanders","802-862-0697"],["WA","Patty Murray","206-553-5545"],["WI","Ron Johnson","605-332-8896"],["WI","Herbert Kohl","414-297-4451"],["WV","Joe Manchin","304-342-5855"],["WV","John Rockefeller","304-347-5372"],["WY","John Barrasso","307-261-6413"],["WY","Michael Enzi","307-682-6268</span>"]]
                var senatorsByState = {}
                $.each(senators, function(i, senator){
                    var state = $.trim(senator[0]);

                    senatorsByState[state] = senatorsByState[state] || [];
                    senatorsByState[state].push(senator.slice(1));

                })
                var target = $("<div class='senator_info'>")
                var dropdown = $("<select id='StopCensorshipStates'>").bind("change", function(){
                    var state = $(this).val()
                    var senators = senatorsByState[state]
                    console.log(state + " - " + senators)

                    target.html(senators[0].join(', ') + (senators.length > 1 ? '<br />' + senators[1].join(', ') : ''))
                })
                var label = $("<label for='StopCensorshipStates'>Select your state</label>");
                $.each(senatorsByState, function(state, senators){
                    dropdown.append(
                        $("<option>", {text: state})
                    )
                })
                return $("<div></div>").append(label).append(dropdown).append(target)
            },

            protestContent : function() {
                var self = this;
                var twitterHandle = this.config.twitterHandle,
                    censorshipUrl = "http://americancensorship.org/",
                    githubUrl = "http://mikesofaer.github.com/stop_censorship/",
                    hashtag = "savetheweb",
                    fftfUrl = "http://fightforthefuture.org/pipa",
                    tweetText = function() {

                        var locationParts = path.parseURL(window.location.toString());

                        locationParts.path = "";
                        locationParts.query = "";
                        locationParts.hash = "";

                        var fullURL = path.stringifyURL(locationParts),
                            host = locationParts.host;

                        return twitterHandle ?
                            "Thank you @" + twitterHandle + " for helping defend the Internet from censorship" :
                            "Thank you " + fullURL + " (" + host + ") for helping defend the Internet from censorship";

                    },
                    box = $("<div class='sopa_popup'><h2>Help Protect Freedom.</h2></div>"),
                    tweet = $("<button>",{type:'button'}).text("Tweet about it.")
                        .bind("click", function(){
                            self.tweetWindow({
                                text: tweetText(),
                                url: censorshipUrl,
                                hashtag: hashtag
                            })
                        }),
                    recensorButton = $("<button class='recensor'>").text("I liked the bars, put them back!")
                        .bind("click", function(){
                            user.setCookie("cf_sopa", "")
                            self.activate()
                        }),
                    americanCensorshipLink = $("<a>")
                        .attr("rel","nofollow")
                        .attr("href",censorshipUrl)
                        .attr("target", "_blank")
                        .text("Read more at AmericanCensorship.org"),
                    githubLink = $("<a>")
                        .attr("rel","nofollow")
                        .attr("href",githubUrl)
                        .attr("target", "_blank")
                        .text("Get this app for your page"),
                    fftfLink = $("<a>")
                        .attr("rel","nofollow")
                        .attr("href",fftfUrl)
                        .attr("target", "_blank")
                        .text("See the video at Fight for the Future"),
                    close = $("<button>").text("Close this window")
                        .bind("click", function() {
                            $.liteDialog('hide');
                        }),
                    actions = [
                        "<p>There is currently United States legislation under consideration that threatens most of the websites you care about.</p>",
                        "<p>Call your Senator and say No to PIPA!</p>",
                        self.senatorDropdown(),
                        tweet,
                        recensorButton,
                        fftfLink,
                        americanCensorshipLink,
                        githubLink,
                        close
                    ];
                $.each(actions, function(i, item){
                    box.append("<br/>").append(item)
                })
                return box;
            },

            inspirationalDialog : function() {
                $("span.sopafied").each(function(i, item){
                    $(item).replaceWith($(item).html())
                })

                this.placeBadge();

                $.liteDialog({ modal: true, html : this.protestContent() })
                $('#hyLiteShdw').bind('click', function() { $.liteDialog('hide'); });
            },

            wrap : function(text) {
                 return $('<span class="sopafied">' + text + '</span>');
            },

            sopaMessage : function(text) {
                var self = this,
                    wrap = function(text) {
                        return self.wrap(text).bind("click", function() { self.inspirationalDialog() })
                    },
                    tokens = text.match(/\w+|[^\w]+/gi),
                    fragment = document.createDocumentFragment()

                $.each(
                    tokens,
                    function(index, token) {

                        if(token.match(self.config.regex))
                            token = wrap(token).get(0);
                        else
                            token = document.createTextNode(token);

                        fragment.appendChild(token);
                    }
                );

                return fragment;
            },

            oppressNode : function(node) {
                node.parentNode.replaceChild(this.sopaMessage($(node).text()), node);
            },

            activate : function(){
                $(this.config.selector).sopafy();
            },

            styleSheet : function(){
                return $('<link rel="stylesheet" media="screen" href="' + cdnPath + 'stylesheets/stop_censorship.css">');
            },
            $ : $,
            user : user
        })

        $.fn.sopafy = function() {
            var cookie = sopaProtest.config.cookie;

            sopaProtest.placeBadge()
            if((cookie && !user.getCookie(cookie)) || user.getCookie("cf_sopa")) {
                return
            }

            this.each(
                function(index, rawElement) {

                    var element = $(rawElement),
                        contents = element.contents();

                    contents.each(
                        function(index, content) {

                            if(!$(content).closest('a').length && 'nodeName' in content && content.nodeName === '#text')
                                sopaProtest.oppressNode(content)
                        }
                    );
                }
            );
            user.setCookie("cf_sopa", "true")
        };

        if (!window.jasmine) {
            $("head").append(sopaProtest.styleSheet());
            sopaProtest.activate();
        }

        return sopaProtest
    }
);
