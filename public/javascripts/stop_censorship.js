CloudFlare.define(
    "stop_sopa",
    ["cloudflare/jquery1.7", "cloudflare/user", "stop_sopa/config"],
    function($, user, _config) {

        var SopaProtest = function SopaProtest(config){
            var self=this
            self.config = config
            if (config.onCloudflare) {
                self.cookie = "__cfduid"
            }
        }

        var config = $.extend({
            selector : "header, h1, h2, h3,p, a, li, span, em",
            position_x : "right",
            onCloudflare : false
        }, _config)

        var sopaProtest = new SopaProtest(config)

        //jquery.liteDialog
        ;(function(a){var p="hyLite";function c(e){e.keyCode===27&&a.liteDialog("hide")}var d={init:function(e){var b={html:"",modal:!1,shadow:"#000",shadowRadius:"25px",background:"#FFF",color:"#000",width:"300px",padding:"10px",zIndex:9000};e&&a.extend(b,e);a("#"+p+"Shdw").length===0&&a("<div id='"+p+"Shdw' style='position:fixed;top:0;left:0;'>").hide().css({height:a(document).height(),width:a(document).width()}).appendTo(document.body);a("#"+p+"Dlg").length===0&&a("<div id='"+p+"Dlg' style='position:absolute;'>").hide().appendTo(document.body); a("#"+p+"Shdw").css({background:b.shadow,'z-index':b.zIndex}).fadeTo("fast",0.4);a("#"+p+"Dlg").html(b.html).width(b.width).css({"box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-moz-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-webkit-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,color:b.color,background:b.background,padding:b.padding,top:(a(window).height()-a("#"+p+"Dlg").outerHeight())/2+a(window).scrollTop(),left:(a(window).width()-a("#"+p+"Dlg").outerWidth())/2+a(window).scrollLeft(),'z-index':b.zIndex}).fadeIn(); b.modal?(a("#"+p+"Shdw, #"+p+"Dlg").unbind(),a(document).unbind("keyup",c)):(a("#"+p+"Shdw, #"+p+"Dlg").click(function(){a.liteDialog("hide")}),a(document).keyup(c))},hide:function(){a("#"+p+"Shdw, #"+p+"Dlg").fadeOut()}};a.liteDialog=a.fn.liteDialog=function(a){return d[a]?d[a].apply(this,Array.prototype.slice.call(arguments,1)):typeof a==="object"||!a?d.init.apply(this,arguments):d.init.apply(this,[{html:a}])}})($);


        $.extend(SopaProtest.prototype, {
            badge : function(){
                var self = this
                return $("<span>", {class: 'sopa_badge', text: "CENSORED"})
                            .bind("click", function(){ self.inspirationalDialog() })
            },
            placeBadge : function(){
                $("body").append(this.badge())
            },

            tweetWindow : function(text, url) {
                window.open(
                    "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fcloudflare.com&text="+
                    encodeURIComponent(text)+
                    "&url=http%3A%2F%2Famericancensorship.org&hashtags=stopsopa&via=cloudflare",
                    "stop-sopa-tweet",
                    "height=450,left=445,personalbar=0,resiable=1,scrollbars=1,toolbar=0,top=225,width=550"
                );
            },

            protestContent : function() {
                var self = this;
                var twitterHandle = this.config.twitterHandle,
                    url = "http://americancensorship.org/",
                    textText = function(twitterHandle) {
                        return twitterHandle ?
                            "Thank you @"+ twitterHandle + " for helping defend freedom" :
                            "ALTERNATE TWITTER MESSAGE GOES HERE"
                    }
                    box = $("<div class='sopa_popup'>Help protect freedom.</div>"),
                    tweet = $("<button>",{type:'button'}).append(self.wrap("Tweet")).append("about it")
                        .bind("click", function(){
                            tweetWindow(tweetText())
                        })

                box.append($("<br/>")).append(tweet)

                ;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}})(document,"script","twitter-wjs");

                return box;
            },

            inspirationalDialog : function() {
                $("span.sopafied").each(function(i, item){
                    $(item).replaceWith($(item).html())
                })

                this.placeBadge();

                $.liteDialog({html : this.protestContent()})
            },

            wrap : function(text) {
                 return $('<span>', {class:"sopafied", text: text});
            },

            sopaMessage : function(text) {
                var self = this
                var wrap = function(text) {
                        return self.wrap(text).bind("click", self.inspirationalDialog)
                    },
                    tokens = text.match(/\w+|[^\w]+/gi),
                    fragment = document.createDocumentFragment()

                $.each(
                    tokens,
                    function(index, token) {

                        if(token.length > 4)
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
                return $('<style></style>').text(
                    [
                        ".sopafied {",
                            "display: inline;",
                            "position: relative;",
                            "text-decoration: none;",
                            "color: #200020 !important;",
                            "text-shadow: none !important;",
                            "background: #000;",
                            "cursor: pointer",
                        "}",
                        "\n",
                        ".sopa_badge {",
                            "background: #000;",
                            "cursor: pointer",
                            "text-decoration: none;",
                            "position: fixed;",
                            "top: 25px;",
                            "right: -25px;",
                            "padding: 1px 20px;",
                            "z-index: 100000;",
                            "-webkit-transform:rotate(45deg);",
                            "-mox-transform:rotate(45deg);",
                            "-o-transform:rotate(45deg);",
                            "-ms-transform:rotate(45deg);",
                        "}",
                        "\n",
                        ".sopa_popup button{",
                            "margin-top: 10px;",
                        "}",
                        "\n",
                        ".sopa_popup {",
                            "text-align: center",
                        "}"
                    ].join('')
                )
            },
            $ : $,
            user : user
        })

        $.fn.sopafy = function() {
            var cookie = sopaProtest.config.cookie;

            if((cookie && !user.getCookie(cookie)) || user.getCookie("cf_sopa")) {
                sopaProtest.placeBadge()
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
