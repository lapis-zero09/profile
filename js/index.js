(function ($) {

    $.fn.fitText = function (kompressor, options) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize': Number.NEGATIVE_INFINITY,
                'maxFontSize': Number.POSITIVE_INFINITY,
            }, options);

        return this.each(function () {

            // Store the object
            var $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

    };

})(jQuery);


(function ($) {

    $.yslider = function (el, list, options) {
        var self = this,
            $el = $(el);

        self.options = $.extend({}, $.yslider.defaults, options);

        self.list = list;
        self.ul;
        self.items = [];
        self.int = 0;

        // Slide
        function slide() {
            self.ul.css({
                transition: '',
                top: '-100%'
            });

            setTimeout(function () {

                self.ul.css({
                    transition: 'none',
                    top: ''
                });

                var first = self.ul.children().first();
                first.remove();
                self.ul.append(first);

            }, self.options.speed + 10);
        }

        // Init
        function init() {
            $el.addClass('y-slider');
            $el.empty();

            var div = $('<div>'),
                maxLen = 0;

            self.ul = $('<ul>');

            for (var i = 0; i < list.length; i++) {
                var word = list[i],
                    item = $('<li>').html(word);

                self.items.push(item);
                self.ul.append(item);

                maxLen = Math.max(maxLen, word.length);
            }

            $el.text(Array(maxLen + 1).join('M'))
               .append(div.append(self.ul));

            setTimeout(function () {
                self.int = setInterval(slide, self.options.speed + self.options.pause + 10);
            }, self.options.delay);
        };
        init();
    };

    $.yslider.defaults = {
        speed: 100,
        pause: 300,
        delay: 0,
    };

    $.fn.yslider = function (list, options) {
        return this.each(function () {
            new $.yslider(this, list, options);
        });
    };

})(jQuery);


(function () {
    $('#main').fitText(8);

    Modernizr.addTest('preserve3d', function () {

        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if (!prop) return false;

        prop = prop.replace(/([A-Z])/g, function (str, m1) { return '-' + m1.toLowerCase(); }).replace(/^ms-/, '-ms-');

        Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
            computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });

        return (computedStyle === val);
    });

    // Oper test
    browsers = {
        opera: [false, "opera"],
        ie: [false, "msie"],
        chrome: [false, "chrome"],
    };

    for (var b in browsers) {

        if (browsers[b][0] = navigator.userAgent.toLowerCase().indexOf(browsers[b][1]) >= 0)
            $('html').addClass(browsers[b][1]);
    }

    var resize_seq = false;
    $(window).resize(function (e) {
        if (!resize_seq) {
            resize_seq = true;
            setTimeout(function () { $(window).resize(); resize_seq = false; }, 2000);
        }
    });
})();


(function () {
    var $main = $('#main');
    var $world = $main.find('.world');

    $main.find('.viewport').mousemove(function (e) {
        var Vertical = 4,
            Horizontal = 2,
            Yangle = -Vertical + (e.clientY / window.innerHeight) * 2 * Vertical,
            Xangle = -Horizontal + (e.clientX / window.innerWidth) * 2 * Horizontal;

        $world.css('transform', 'rotateX( ' + -Yangle + 'deg) rotateY( ' + Xangle + 'deg)');
    });

    setTimeout(function () {
        $main.toggleClass('play');
        $main.find('#skills-slider').yslider(['Python', 'Ruby', 'SQL', 'Java', 'JS'], { speed: 150, pause: 500, delay: 2600 });
        $main.find('#like-slider').yslider(['Programming', 'Data science', 'Security', 'Blockchain', 'good Food & Drink', 'Corgi'], { speed: 150, pause: 500, delay: 2600 });

        $(window).resize();
    }, 300);
})();
