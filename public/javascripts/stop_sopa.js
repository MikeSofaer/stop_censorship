CloudFlare.define(
    "stop_sopa",
    ["cloudflare/jquery1.7", "cloudflare/user", "stop_sopa/config"],
    function($, user, config) {
        
        //jquery.liteDialog
        ;(function(a){var p="hyLite";function c(e){e.keyCode===27&&a.liteDialog("hide")}var d={init:function(e){var b={html:"",modal:!1,shadow:"#000",shadowRadius:"25px",background:"#FFF",color:"#000",width:"300px",padding:"10px",zIndex:9000};e&&a.extend(b,e);a("#"+p+"Shdw").length===0&&a("<div id='"+p+"Shdw' style='position:fixed;top:0;left:0;'>").hide().css({height:a(document).height(),width:a(document).width()}).appendTo(document.body);a("#"+p+"Dlg").length===0&&a("<div id='"+p+"Dlg' style='position:absolute;'>").hide().appendTo(document.body); a("#"+p+"Shdw").css({background:b.shadow,'z-index':b.zIndex}).fadeTo("fast",0.4);a("#"+p+"Dlg").html(b.html).width(b.width).css({"box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-moz-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-webkit-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,color:b.color,background:b.background,padding:b.padding,top:(a(window).height()-a("#"+p+"Dlg").outerHeight())/2+a(window).scrollTop(),left:(a(window).width()-a("#"+p+"Dlg").outerWidth())/2+a(window).scrollLeft(),'z-index':b.zIndex}).fadeIn(); b.modal?(a("#"+p+"Shdw, #"+p+"Dlg").unbind(),a(document).unbind("keyup",c)):(a("#"+p+"Shdw, #"+p+"Dlg").click(function(){a.liteDialog("hide")}),a(document).keyup(c))},hide:function(){a("#"+p+"Shdw, #"+p+"Dlg").fadeOut()}};a.liteDialog=a.fn.liteDialog=function(a){return d[a]?d[a].apply(this,Array.prototype.slice.call(arguments,1)):typeof a==="object"||!a?d.init.apply(this,arguments):d.init.apply(this,[{html:a}])}})($);

        var selector = "header, h1, h2, h3,p, a, li, span, em",
            styleSheet = $('<style></style>'),
            placeBadge = function(){

                $("body").append("<a class='sopa_badge' href='http://americancensorship.org' target='_blank'>CENSORED</a>")
            },
            tweetWindow = function(text, url) {

                window.open(
                    "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fcloudflare.com&text="+
                    encodeURIComponent(text)+
                    "&url=http%3A%2F%2Famericancensorship.org&hashtags=stopsopa&via=cloudflare",
                    "stop-sopa-tweet",
                    "height=450,left=445,personalbar=0,resiable=1,scrollbars=1,toolbar=0,top=225,width=550"
                );
            },
            protestContent = function() {

                var url = "http://americancensorship.org/",
                    text = twitterHandle ? "Thank you @"+ twitterHandle + " for helping defend freedom" : "ALTERNATE TWITTER MESSAGE GOES HERE",
                    box = $("<div class='sopa_popup'>Help protect freedom.</div>"),
                    tweet = $("<button type='button'><a class='sopafied'>Tweet</a> about it.</button>").bind("click", function(){ tweetWindow(text) })

                box.append($("<br/>")).append(tweet)

                ;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}})(document,"script","twitter-wjs");

                return box;
            },
            suggestionDialog = function() {

                $("a.sopafied").each(function(i, item){
                    $(item).replaceWith($(item).html())
                })

                placeBadge();

                $.liteDialog({html : protestContent()})
            },
            sopaMessage = function(text) {

                var wrap = function(text) {
                        var wrapped = $('<a class="sopafied" href="javascript:void(0);"></a>').text(text);
                        wrapped.bind("click", suggestionDialog);
                        return wrapped
                    },
                    tokens = text.match(/\w+|[^\w]+/gi),
                    fragment = document.createDocumentFragment();

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
            twitterHandle,
            cookie,
            exports;

        styleSheet.text(
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
        ).appendTo($('head'));

        $.fn.sopafy = function() {

            if((cookie && !user.getCookie(cookie)) || user.getCookie("cf_sopa")) {

                placeBadge()
                return
            }

            this.each(
                function(index, rawElement) {

                    var element = $(rawElement),
                        contents = element.contents();
                        
                    contents.each(
                        function(index, content) {

                            if('nodeName' in content && content.nodeName === '#text')
                                content.parentNode.replaceChild(sopaMessage($(content).text()), content);
                        }
                    );
                }
            );

            user.setCookie("cf_sopa", "true")

        };

        exports = {

            targetSelector: function(value) {

                if(value) selector = value;
                else return selector;
            },

            callback : suggestionDialog,
            content : protestContent,
            activate : function() {

                $(selector).sopafy()
            },
            cookie : function(value){
                cookie = value
            },
            twitterHandle : function(value) {
                twitterHandle = value
            }
        };

        if(config) {

            exports.cookie("__cfduid")
            twitterHandle(config.twitterHandle)

            if(config.selector)
                targetSelector(config.selector)

            exports.activate()
        }

        return exports
    }
);
