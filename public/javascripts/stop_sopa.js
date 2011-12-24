CloudFlare.define(
    "stop_sopa",
    ["cloudflare/jquery1.7"],
    function($) {

        var selector = "header, h1",
            styleSheet = $('<style></style>');

        styleSheet.text(
            [
                ".sopafied {",
                    "display: inline;",
                    "position: relative;",
                    "text-decoration: none;",
                    "color: #300030;",
                    "background: #000;",
                    "cursor: pointer",
                "}"
                ].join('')
        ).appendTo($('head'));

        window.$ = $;

        $.fn.sopafy = function() {

            var els = this;

            els.each(
                function(index, rawEl) {

                    var el = $(rawEl),
                        // Get all word at least five characters long..
                        contents = el.contents();

                    contents = contents.map(
                        function(index, content) {

                            if('nodeName' in content && content.nodeName === "#text")
                                content = sopaMessage($(content).text());

                            return content;
                        }
                    );

                    el.empty();

                    contents.each(function(i, obj){
                        el.append(obj)
                    })
                    function sopaMessage(text) {

                        var tokens = text.match(/\w+|[^\w]+/gi),
                            wrap = function(text) {
                               return $('<a class="sopafied" href="javascript:void(0);"></a>').text(text);
                            }

                        return $.map(
                            tokens,
                            function(token) {

                                if(token.length > 4)
                                    token = wrap(token);
                                else
                                    token = token;

                                return token;
                            }
                        );
                    }
                }
            )
        };

        return {

            targetSelector: function(value) {

                if(value) selector = value;
                else return selector;
            }
        }
    }
);
