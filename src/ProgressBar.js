var ProgressBar = (function() {

    var _instance = {};

    var pb = function(options) {
        this.defaults= {
            css: {
                '$el': {
                    height: '20px',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    position: 'relative',
                },
                '$progressBar': {
                    margin: 0,
                    position: 'absolute',
                    'padding-right': '10px',
                    'text-align': 'right',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                },
                '$filename': {
                    display: 'block',
                    position: 'absolute',
                    width: '100%',
                    'text-align': 'center',
                    'z-index': 1,
                    color: '#333',
                },
                '$btn': {
                    width: '20px',
                    height: '20px',
                    '-webkit-border-radius': '50%',
                    '-moz-border-radius': '50%',
                    'border-radius': '50%',
                    position: 'absolute',
                    right: 0,
                    'z-index' : 2,
                },
            },
            listeners: {
                'click:$btn' : function() {
                }
            }
        };
        $.extend(this.defaults, options);
        this.init()
    };
    $.extend(pb.prototype, {
        setKey: function(key) {
            this.key = key;
        },
        init: function() {
            this._render();
            this._initListeners();
        },
        _applyCss: function() {
            for(var selector in this.defaults.css) {
                for(var  key in this.defaults.css[selector]) {
                    this[selector][0].style[key] = this.defaults.css[selector][key];
                }
            }
        },
        _render: function() {
                this.$el = $('<div class="progress">');
                this.$filename = $('<span class="filename">');
                this.$progressBar = $('<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">');
                this.$btn =  $('<button>X</button>');
                this._applyCss();
                this.$el.append(this.$filename).append(this.$progressBar).append(this.$btn);
        },
        _initListeners: function() {
             var that = this; _log(this.defaults.listeners);
             for (var key in this.defaults.listeners) {
                 if (typeof this.defaults.listeners[key] === 'function') {
                     var keyParts = key.split(':');
                     var event = keyParts[0];
                     var $target = that[keyParts[1]];

                     $target.bind(event, $.proxy(this.defaults.listeners[key], that));
                 }
             }
        },
        destroy: function() {
            this.$el.remove();
            if (undefined !== this.key) {
                _instance[this.key] = null;
            }
        }
    });

    function init(params, key) {
        if (typeof key === 'string') {
            _instance[key] = new pb(params);
            _instance[key].setKey(key);
            return _instance[key];
        }
        return new pb(params);
    }

    function getInstance(key) {
        if (undefined === _instance[key]) {
            return null;
        }
        return _instance[key];
    }

    return {
        init: init,
        getInstance: getInstance
    }
})();
