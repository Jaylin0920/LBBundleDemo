/**
 * Created by Harris on 16/8/1.
 */
!function (exports) {
    "use strict";
    var Util = exports.Util || (exports.Util = {});

    Util.loadJS = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.callback = typeof callback != "undefined" ? callback : new Function();
        script[document.all ? "onreadystatechange" : "onload"] = function () {
            if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                return;
            }
            this.callback(this);
            this.callback = null;
            this[document.all ? "onreadystatechange" : "onload"] = null;
            this.parentNode.removeChild(this);
        };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    //设置cookie
    Util.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };
    //获取cookie
    Util.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };
    //清除cookie
    Util.clearCookie = function(name) {
        setCookie(name, "", -1);
    };

    Util.isArray = Array.isArray || isType("array");

    Util.isFunction = isType("function");

    Util.isObject = isType("object");

    Util.extend = function (target) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.forEach(function (arg) {
            _extend(target, arg);
        });
        return target;
    };

    Util.inherits = function(ctor,superCtor,ignores){
        var proto = ctor.prototype,superProto = superCtor.prototype || superCtor;
        for(var p in superProto){
            if(superProto.hasOwnProperty(p)){
                if(ignores && ignores.indexOf(p) > -1) continue;

                if(p !== 'prototype'){
                    proto[p] = superProto[p];
                }
            }

        }
    };
    Util.timeDiff = function(time1,time2){
        if(arguments.length === 1){
            time2 = time1;
            time1 = 0;
        }
        if(typeof time1 === 'string'){
            time1 = strToTime(time1);
        }
        if(typeof time2 === 'string'){
            time2 = strToTime(time2);
        }
        var diff = (time2 - time1) / 1000,
            dd = parseInt(diff / 60 / 60 / 24 , 10),
            hh = parseInt(diff / 60 / 60 % 24 , 10),
            mm = parseInt(diff / 60 % 60,10),
            ss = parseInt(diff % 60,10);
        return diff >= 0 ? {
            dd:Util.preFull(dd),
            hh:Util.preFull(hh),
            mm:Util.preFull(mm),
            ss:Util.preFull(ss)
        } : false;
    };

    Util.strToTime = function(str){
        return Util.strToDate(str).getTime();
    };

    Util.strToDate = function(str){
        str = Util.makeString(str);
        var date = new Date(str.replace(/-/g,'/'));
        if((/Invalid/i).test(date)){
            date = new Date(null);
        }
        return date;
    };
    var timeFixed = function (t) {
            return t < 10 ? "0" + t : t+'';
        },
        normalizeDate = function (time) {
            if(!(time instanceof Date)){
                try{
                    time = this.strToDate(time);
                }catch(e){
                    time = new Date();
                }
            }
            time.year = time.getFullYear();
            time.month = time.getMonth()+1;
            time.day = time.getDate();
            time.hours = time.getHours();
            time.minute = time.getMinutes();
            time.seconds = time.getSeconds();
            return time;
        };
    Util.normalizeData = normalizeDate;
    Util.timeFixed = timeFixed;

    Util.timeFormat =  function (time, sys) {
        //简单判断时间是否为0000-00-00 00:00:00
        if(!time || !(/^[1-2]\d{3}/.test(time))){
            return '--';
        }
        time = Util.strToDate(time);
        if(!sys){
            sys = new Date();
        }else{
            sys = Util.strToDate(sys);
        }
        var second = (sys.getTime() - time.getTime()) / 1000;
        normalizeDate(time);
        normalizeDate(sys);
        if(second < 60){
            return '刚刚';
        }else if(second < 3600){
            return Math.floor(second / 60)+'分钟前';
        }else if(sys.year !== time.year){
            return time.year+'-'+timeFixed(time.month)+'-'+timeFixed(time.day);
        }else if(time.month === sys.month && time.day === sys.day){
            return timeFixed(time.hours)+':'+timeFixed(time.minute);
        }else{
            return timeFixed(time.month)+'-'+timeFixed(time.day)+' '+timeFixed(time.hours)+':'+timeFixed(time.minute);
        }
    };

    Util.makeString = function (obj) {
        if(obj == null){
            return '';
        }
        return '' + obj;
    };

    Util.isPhoneNumber = function (n) {
        return /^1[\d]{10}$/.test(n);
    };


    Util.call = function (fn, content) {
        return function (arg) {
            return fn.call(content, arg);
        }
    }

    Util.reloadThisPage = function (bool) {
        if (!!bool) {
            var uri = Util.URL(window.location.href);
            uri.params._ = Util.getTime();
            window.location.replace(uri.toString());
        } else {
            window.location.reload();
        }
    }

    Util.getTime = Date.now || function () {
            return new Date().getTime();
        };

    Util.preFull = function (str, len, pre) {
        str += "";
        len = len || 2;
        pre = pre || "0";
        var start = str.length;
        for (; start < len; start++) {
            str = pre + str;
        }
        return str;
    };

    Util.nextTick = function (cb) {
        setTimeout(function () {
            Util.isFunction(cb) && cb();
        }, 0);
    };

    Util.bLength = function (str) {
        str = str + "";
        return str.replace(/[^\x00-\xff]/g,'aa').length;
    };


    Util.linkAddSFR = function (url, sfr) {
        var _url = Util.URL(url);
        if (!sfr) {
            var pathname = window.location.pathname.split("/");
            sfr = "h5" + pathname.join("_");
        }
        _url.params.sfr = sfr;
        return _url.toString();
    };

    //params 

    Util.params = function () {
        "use strict";
        var params = {},
            search = window.location.search.replace(/^\?/, ""),
            hash = window.location.hash.replace(/^#/, "");

        function getParams(str) {
            var params = {};
            if (str) {
                var _str = str.split("&"),
                    len = _str.length,
                    i = 0,
                    item = null;
                for (; i < len; i++) {
                    item = _str[i].split("=");
                    try {
                        params[item[0]] = decodeURIComponent(item[1]);
                    } catch (e) {
                        params[item[0]] = item[1];
                    }
                }
            }
            return params;
        }

        params.search = getParams(search);
        params.hash = getParams(hash);
        params.getParam = getParams;

        return params;
    }();

    //version

    Util.Version = function () {
        "use strict";
        function Version(v){

            Object.defineProperty(this, 'val', {
                value: v.toString(),
                enumerable: true
            });

            /**
             * 判断是否大于某个版本
             * @method gt
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否大于
             * @instance
             * @memberof Version
             */
            this.gt = function(v) {
                return Version.compare(this, v) > 0;
            };

            /**
             * 判断是否大于等于某个版本
             * @method gte
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否大于等于
             * @instance
             * @memberof Version
             */
            this.gte = function(v) {
                return Version.compare(this, v) >= 0;
            };

            /**
             * 判断是否小于某个版本
             * @method lt
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否小于
             * @instance
             * @memberof Version
             */
            this.lt = function(v) {
                return Version.compare(this, v) < 0;
            };

            /**
             * 判断是否小于等于某个版本
             * @method lte
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否小于等于
             * @instance
             * @memberof Version
             */
            this.lte = function(v) {
                return Version.compare(this, v) <= 0;
            };

            /**
             * 判断是否等于某个版本
             * @method eq
             * @param {String} v - 需要比较的版本号
             * @return {Boolean} 是否等于
             * @instance
             * @memberof Version
             */
            this.eq = function(v) {
                return Version.compare(this, v) === 0;
            };
        }
        /**
         * 返回当前版本字符串
         * @method toString
         * @return {String} 当前版本字符串
         * @instance
         * @memberof Version
         */
        Version.prototype.toString = function() {
            return this.val;
        };

        /**
         * 返回当前版本
         * @method valueOf
         * @return {Boolean} 当前版本
         * @instance
         * @memberof Version
         */
        Version.prototype.valueOf = function(){
            var v = this.val.split('.');
            var r = [];
            for(var i = 0; i < v.length; i++) {
                var n = parseInt(v[i],10);
                if (isNaN(n)) {
                    n = 0;
                }
                var s = n.toString();
                if (s.length < 5) {
                    s = Array(6 - s.length).join('0') + s;
                }
                r.push(s);
                if(r.length === 1) {
                    r.push('.');
                }
            }
            return parseFloat(r.join(''));
        };

        /**
         * 返回当前版本字符串
         * @method compare
         * @param {String} v1 - 需要比较的版本1
         * @param {String} v2 - 需要比较的版本2
         * @return {Number} 0表示相等，-1表示小于，1表示大于
         * @memberof Version
         */
        Version.compare = function (v1,v2){
            v1 = v1.toString().split('.');
            v2 = v2.toString().split('.');

            for(var i = 0; i < v1.length || i < v2.length; i++) {
                var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);

                if(window.isNaN(n1)) {
                    n1 = 0;
                }
                if(window.isNaN(n2)) {
                    n2 = 0;
                }
                if( n1 < n2 ) {
                    return -1;
                }
                else if( n1 > n2) {
                    return 1;
                }
            }
            return 0;
        };


        /**
         * 解析和操作版本号
         * @method version
         * @param {string} v - 需要解析的版本号
         * @return {Version} Verson实例
         * @memberof lib
         */
        return function (v) {
            return new Version(v);
        }
    }();

    //sinaApp

    Util.sinaApp = function () {
        var ua = window.navigator.userAgent,
            matched,
            name,
            platform,
            version;

        var sinaApp = false;

        if (!!ua.match(/lcs_/)) {
            name = 'Licaishi';
            matched = ua.match(/lcs_(\w+)_([\d\.]+)/i);
            platform = matched[1] === 'iOS' ? 'IOS' : (matched[1] === 'android' ? 'android' : 'unknown');
            version = matched[2];

            sinaApp = {
                appname: name,
                platform: platform,
                isAndroid: platform === 'android',
                isIOS: platform === 'IOS',
                isLicaishi: true,
                version: version
            }
        } else if (!!ua.match(/lcsadmin_/)) {
            name = "LicaishiAdmin";
            matched = ua.match(/lcsadmin_(\w+)_([\d\.]+)/i);
            platform = matched[1] === 'iOS' ? 'IOS' : (matched[1] === 'android' ? 'android' : 'unknown');
            version = matched[2];

            sinaApp = {
                appname: name,
                platform: platform,
                isIOS: platform === 'IOS',
                isAndroid: platform === 'android',
                isLicaishiAdmin: true,
                version: version
            }
        }

        if (Util.Version && sinaApp) {
            sinaApp.version = Util.Version(sinaApp.version);
        }

        return sinaApp;
    }();

    //financeApp

    Util.financeApp = function () {
        "use strict";
        var ua = window.navigator.userAgent;
        var financeApp = false;

        if (!!ua.match(/sinafinance/)) {
            financeApp  = {
                appname: 'Finance',
                isFinance: true
            }
        }

        return financeApp;
    }();

    //thirdApp

    Util.thirdApp = function () {
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        var thirdApp = false;

        if (!!ua.match(/Weibo/i)) {
            thirdApp  = {
                appname: 'Weibo',
                isWeibo: true
            }
        } else if (!!ua.match(/MicroMessenger/i)) {
            thirdApp = {
                appname: 'Weixin',
                isWeixin: true,
                isWeiChat: true //兼容旧版
            }
        } else if ((matched = ua.match(/\s+QQ\/([\d\.]+)/)) && !!matched) {
            thirdApp = {
                appname: 'QQ',
                isQQ: true,
                version: Util.Version ? Util.Version(matched[1]) : matched[1]
            }
        }

        return thirdApp;
    }();
    //Browser

    Util.browser = function () {
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        /**
         * @instance browser
         * @memberof lib
         * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
         * @property {lib.Version} version - 浏览器版本号
         * @property {Boolean} isUC - 是否是UC浏览器
         * @property {Boolean} isQQ - 是否是QQ浏览器
         * @property {Boolean} isIE - 是否是IE浏览器
         * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
         * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
         * @property {Boolean} isChrome - 是否是Chrome浏览器
         * @property {Boolean} isAndroid - 是否是Android的原生浏览器
         * @property {Boolean} isSafari - 是否是Safari浏览器
         * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
         */
        var browser = {
            name: "unknown",
            version: "0.0.0"
        };

        if ((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
            browser = {
                name: 'UC',
                isUC: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
            browser = {
                name: 'QQ',
                isQQ: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/Firefox|FxiOS\/([\d\.]+)/))) {
            browser = {
                name: 'Firefox',
                isFirefox: true,
                version: matched[1]
            }
        } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) ||
            (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

            browser = {
                version: matched[1]
            };

            if (ua.match(/IEMobile/)) {
                browser.name = 'IEMobile';
                browser.isIEMobile = true;
            } else {
                browser.name = 'IE';
                browser.isIE = true;
            }

            if (ua.match(/Android|iPhone/)) {
                browser.isIELikeWebkit = true;
            }
        } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
            browser = {
                name: 'Chrome',
                isChrome: true,
                version: matched[1]
            };

            if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
                browser.name = 'Chrome Webview';
                browser.isWebview = true;
            }
        } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
            browser = {
                name: 'Android',
                isAndroid: true,
                version: matched[1]
            }
        } else if(ua.match(/iPhone|iPad|iPod/)) {
            if(ua.match(/Safari/)) {
                matched = ua.match(/Version\/([\d\.]+)/);
                browser = {
                    name: 'Safari',
                    isSafari: true,
                    version: matched && matched[1]
                }
            } else {
                matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
                browser = {
                    name: 'iOS Webview',
                    isWebview: true,
                    version: matched && matched[1].replace(/\_/, '.')
                }
            }
        }

        if (Util.Version) {
            browser.version = Util.Version(browser.version || '0.0.0');
        }

        return browser;

    }();

    //OS
    Util.os = function (){
        "use strict";
        var ua = window.navigator.userAgent,
            matched;
        var os = {
            name: "unknown",
            version: "0.0.0"
        };
        /**
         * @instance os
         * @memberof lib
         * @property {String} name - 操作系统名称，比如Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown等
         * @property {lib.Version} version - 操作系统版本号
         * @property {Boolean} isWindowsPhone - 是否是Windows Phone
         * @property {Boolean} isIPhone - 是否是iPhone/iTouch
         * @property {Boolean} isIPad - 是否是iPad
         * @property {Boolean} isIOS - 是否是iOS
         * @property {Boolean} isAndroid - 是否是Android手机
         * @property {Boolean} isAndroidPad - 是否是Android平板
         */


        if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
            os = {
                name: 'Windows Phone',
                isWindowsPhone: true,
                version: matched[1]
            }
        } else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
            os = {
                version: matched[1]
            };

            if (!!ua.match(/Mobile\s+Safari/)) {
                os.name = 'Android';
                os.isAndroid = true;
            } else {
                os.name = 'AndroidPad';
                os.isAndroidPad = true;
            }
        } else if ((matched = ua.match(/(iPhone|iPad|iPod)/))) {
            var name = matched[1];

            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

            os = {
                name: name,
                isIphone: (name === 'iPhone' || name === 'iPod'),
                isIpad: name === 'iPad',
                isIOS: true,
                version: matched[1].split('_').join('.')
            }
        }

        if (Util.Version) {
            os.version = Util.Version(os.version);
        }

        return os;

    }();
    //URL

    Util.URL = function () {

        var PROTOCAL = [
            'http', 'https', 'sinalicaishi', 'licaishi', 'sinalicaishiadmin', 'licaishiadmin'
        ];

        /**
         * 解析和操作url
         * @class HttpURL
         * @param {string} url - 需要解析和操作的url
         */
        function HttpURL(url){
            var params = {};

            /**
             * 查询串键值对
             * @prop {Object} params
             * @memberof HttpURL
             * @instance
             */
            Object.defineProperty(this, 'params', {
                set: function(v){
                    if (typeof v === 'object'){
                        for(var p in params) {
                            delete params[p];
                        }
                        for(var p in v) {
                            params[p] = v[p];
                        }
                    }
                },
                get: function() {
                    return params;
                },
                enumerable: true
            });

            Object.defineProperty(this, 'search', {
                set: function(v) {
                    if(typeof v === 'string') {
                        if (v.indexOf('?') === 0) {
                            v = v.substr(1);
                        }
                        var search = v.split('&');
                        for(var p in params) {
                            delete params[p];
                        }
                        for(var i = 0 ; i < search.length; i++) {
                            var pair = search[i].split('=');
                            if (pair[0]) {
                                try {
                                    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                                } catch(e) {
                                    params[pair[0]] = pair[1] || '';
                                }
                            }
                        }
                    }
                },
                get: function(){
                    var search = [];
                    for(var p in params) {
                        if (params[p]) {
                            try {
                                search.push(encodeURIComponent(p) +'=' + encodeURIComponent(params[p]));
                            } catch(e) {
                                search.push(p +'=' + params[p]);
                            }
                        } else {
                            try {
                                search.push(encodeURIComponent(p));
                            } catch(e) {
                                search.push(p);
                            }
                        }
                    }
                    if (search.length) {
                        return '?' + search.join('&');
                    } else {
                        return '';
                    }

                },
                enumerable: true
            });

            var hash;
            Object.defineProperty(this, 'hash', {
                set: function(v) {
                    if (v && v.indexOf('#') < 0) {
                        v = '#' + v;
                    }
                    hash = v || '';
                },
                get: function() {
                    return hash;
                },
                enumerable: true
            });

            this.set = function(v) {
                v = v || '';
                var matchArr;
                if((matchArr = v.match(new RegExp('^([a-z0-9-]+\:)?' +    //protocol
                        '[/]{2}' +                            //slash x 2
                        '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
                        '([^:/?#]+)' +                        //hostname
                        '(?:[:]([0-9]+))?' +                  //port
                        '([/][^?#;]*)?' +                     //pathname
                        '(?:[?]([^?#]*))?' +                  //search
                        '(#[^#]*)?$'                          //hash
                        , 'i')))){
                    /**
                     * 协议头
                     * @member {String} protocol
                     * @memberof HttpURL
                     * @instance
                     */
                    this.protocol = matchArr[1] || location.protocol;
                    /**
                     * 用户名
                     * @member {String} username
                     * @memberof HttpURL
                     * @instance
                     */
                    this.username = matchArr[2] || '';
                    /**
                     * 密码
                     * @member {String} password
                     * @memberof HttpURL
                     * @instance
                     */
                    this.password = matchArr[3] || '';
                    /**
                     * 主机名
                     * @member {String} hostname
                     * @memberof HttpURL
                     * @instance
                     */
                    /**
                     * 主机名
                     * @member {String} host
                     * @memberof HttpURL
                     * @instance
                     */
                    this.hostname = this.host = matchArr[4];
                    /**
                     * 端口
                     * @member {String} port
                     * @memberof HttpURL
                     * @instance
                     */
                    this.port = matchArr[5] || '';
                    /**
                     * 路径
                     * @member {String} pathname
                     * @memberof HttpURL
                     * @instance
                     */
                    this.pathname = matchArr[6] || '/';
                    /**
                     * 查询串
                     * @member {String} search
                     * @memberof HttpURL
                     * @instance
                     */
                    this.search = matchArr[7] || '';
                    /**
                     * 锚点串
                     * @member {String} hash
                     * @memberof HttpURL
                     * @instance
                     */
                    this.hash = matchArr[8] || '';
                    /**
                     * 地址源
                     * @member {String} origin
                     * @memberof HttpURL
                     * @instance
                     */
                    this.origin = this.protocol + '//' + this.hostname;
                } else {
                    throw new Error('Wrong uri scheme.');
                }
            };

            /**
             * 查询串键值对
             * @method toString
             * @return {String} 完整URL地址
             * @memberof HttpURL
             * @instance
             */
            this.toString = function(){
                var string = this.protocol + '//';
                if(this.username) {
                    string += this.username;
                    if(this.password) {
                        string += ':' + this.password;
                    }
                    string += '@';
                }
                string += this.host;
                if(this.port && this.port !== '80') {
                    string += ':' + this.port;
                }
                if(this.pathname) {
                    string += this.pathname;
                }
                if(this.search) {
                    string += this.search;
                }
                if(this.hash) {
                    string += this.hash;
                }
                return string;
            };

            if (url) {
                this.set(url.toString());
            }
        }

        /**
         * @namespace lib
         */

        /**
         * 解析和操作url
         * @method httpurl
         * @param {string} url - 需要解析和操作的url
         * @return {HttpURL} HttpURL实例
         * @memberof lib
         */
        return function (url) {
            return new HttpURL(url);
        };
    }();

    //callApp
    Util.callApp = function () {
        "use strict";
        var doc = document,
            location = window.location,
            isLicaishi = Util.sinaApp && Util.sinaApp.isLicaishi,
            isFinance = Util.financeApp && Util.financeApp.isFinance,
            defaultUri = 'sinalicaishi://com.sina.licaishi/open',
            os = Util.os,
            browser = Util.browser,
            ua = window.navigator.userAgent,
            packageMap = {
                sinaLicaishi: 'com.sina.licaishi',
                sinaLicaishiAdminIOS: 'com.sina.planner-IOS',
                sinaLicaishiAdminAndroid: 'com.sina.licaishiadmin'
            };
        var iframe;
        var defaultParams = {
            from: 'h5',
            href: location.href
        };

        function appendParams(params, extreParam) {
            for (var key in extreParam) {
                if (extreParam.hasOwnProperty(key)) {
                    params[key] = extreParam[key];
                }
            }
            return params
        }

        function buildUrl(options) {
            var url = Util.URL(options.url || defaultUri);
            var params = JSON.parse(url.params.params || "{}");
            params = appendParams(params, options.params);
            try {
                params = encodeURIComponent(JSON.stringify(params));
            }catch (e) {
                params = JSON.stringify(params);
            }
            url.params = {
                params: params
            }
            return url
        }
        function callInIframe (url) {
            if (!iframe) {
                iframe = doc.createElement('iframe');
                iframe.id = 'callapp_iframe_' + Date.now();
                iframe.frameborder = 0;
                iframe.style.cssText = "display: none;border:0;width:0;height:0;";
                doc.body.appendChild(iframe);
            }

            iframe.src = url;
        }

        function setLocation (url, options) {
            if (options.replace !== false && (isLicaishi || isFinance || options.replace === true)) {
                location.replace(url);
            } else {
                location.href = url;
            }
        }

        function useAnchorLink (url, options) {
            var a = document.createElement('a');
            a.setAttribute('href', url);
            a.style.display = 'none';
            document.body.appendChild(a);

            var e = document.createEvent('HTMLEvents');
            e.initEvent('click', false, false);
            a.dispatchEvent(e);
        }

        function goPage (options) {
            options = options || {};
            if (typeof options.params === 'undefined') {
                options.params = appendParams({}, defaultParams);
            } else {
                options.params = appendParams(options.params, defaultParams);
            }

            var url = buildUrl(options);
            var isOriginalChrome = os.isAndroid && browser.isChrome && !browser.isWebview;
            var fixUgly = os.isAndroid && !!ua.match(/samsung/i) && os.version.gte('4.3') && os.version.lt('4.5');
            var ios9SafariFix = os.isIphone && os.version.gte('9.0') && browser.isSafari;

            //if (isOriginalChrome || fixUgly || !!options.forceIntent) {
            //    url.hash = 'Intent;scheme=' + url.protocol.replace(':', '') + ';package=' + (options['package'] || packageMap[url.protocol])+';end';
            //    url.protocol = 'intent:';
            //}

            if (ios9SafariFix) {
                setTimeout(function () {
                    useAnchorLink(url.toString(), options);
                }, 100);
            } else if (isLicaishi || isFinance || fixUgly || isOriginalChrome || os.isIOS) {
                setTimeout(function () {
                    setLocation(url.toString(), options);
                    // useAnchorLink(url.toString(), options);
                }, 100);
            } else {
                callInIframe(url.toString());
            }
        }

        function download (url, options) {
            if (typeof url != 'string' && !options) {
                options = url;
                url = undefined;
            }
            options = options || {};
            if (!url) {
                url = "http://licaishi.sina.com.cn/web/clientJump";
            }
            url = Util.URL(url);

            url.params.from = 'h5';
            url.params.href = location.href;

            if (options.params) {
                appendParams(url.params, options.params);
            }
            if (!url.params.type) {
                url.params.type = [os.name, os.version].join("_");
            }
            if (!url.params.ch) {
                url.params.ch = 'lib_sdk_call_app_auto_jump';
            }

            url = url.toString();

            setLocation(url, options);
        }

        return {
            goPage: goPage,
            download: download
        }
    }();
    //Events
    Util.Events = function () {
        // Events
// -----------------
// Thanks to:
//  - https://github.com/documentcloud/backbone/blob/master/backbone.js
//  - https://github.com/joyent/node/blob/master/lib/events.js


// Regular expression used to split event strings
        var eventSplitter = /\s+/;


// A module that can be mixed in to *any object* in order to provide it
// with custom events. You may bind with `on` or remove with `off` callback
// functions to an event; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = new Events();
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//
        function Events() {
        }


// Bind one or more space separated events, `events`, to a `callback`
// function. Passing `"all"` will bind the callback to all events fired.
        Events.prototype.on = function (events, callback, context) {
            var cache, event, list;
            if (!callback) return this;

            cache = this.__events || (this.__events = {});
            events = events.split(eventSplitter);

            while (event = events.shift()) {
                list = cache[event] || (cache[event] = []);
                list.push(callback, context)
            }

            return this
        };

        Events.prototype.once = function (events, callback, context) {
            var that = this;
            var cb = function () {
                that.off(events, cb);
                callback.apply(context || that, arguments)
            };
            return this.on(events, cb, context)
        };

// Remove one or many callbacks. If `context` is null, removes all callbacks
// with that function. If `callback` is null, removes all callbacks for the
// event. If `events` is null, removes all bound callbacks for all events.
        Events.prototype.off = function (events, callback, context) {
            var cache, event, list, i;

            // No events, or removing *all* events.
            if (!(cache = this.__events)) return this;
            if (!(events || callback || context)) {
                delete this.__events;
                return this
            }

            events = events ? events.split(eventSplitter) : keys(cache);

            // Loop through the callback list, splicing where appropriate.
            while (event = events.shift()) {
                list = cache[event];
                if (!list) continue;

                if (!(callback || context)) {
                    delete cache[event];
                    continue
                }

                for (i = list.length - 2; i >= 0; i -= 2) {
                    if (!(callback && list[i] !== callback ||
                        context && list[i + 1] !== context)) {
                        list.splice(i, 2)
                    }
                }
            }

            return this
        };


// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
        Events.prototype.trigger = function (events) {
            var cache, event, all, list, i, len, rest = [], args, returned = true;
            if (!(cache = this.__events)) return this;

            events = events.split(eventSplitter);

            // Fill up `rest` with the callback arguments.  Since we're only copying
            // the tail of `arguments`, a loop is much faster than Array#slice.
            for (i = 1, len = arguments.length; i < len; i++) {
                rest[i - 1] = arguments[i]
            }

            // For each event, walk through the list of callbacks twice, first to
            // trigger the event, then to trigger any `"all"` callbacks.
            while (event = events.shift()) {
                // Copy callback lists to prevent modification.
                if (all = cache.all) all = all.slice();
                if (list = cache[event]) list = list.slice();

                // Execute event callbacks except one named "all"
                if (event !== 'all') {
                    returned = triggerEvents(list, rest, this) && returned
                }

                // Execute "all" callbacks.
                returned = triggerEvents(all, [event].concat(rest), this) && returned
            }

            return returned
        };

        Events.prototype.emit = Events.prototype.trigger;


// Helpers
// -------

        var keys = Object.keys;

        if (!keys) {
            keys = function (o) {
                var result = [];

                for (var name in o) {
                    if (o.hasOwnProperty(name)) {
                        result.push(name)
                    }
                }
                return result
            }
        }

// Mix `Events` to object instance or Class function.
        Events.mixTo = function (receiver) {
            var proto = Events.prototype;

            if (isFunction(receiver)) {
                for (var key in proto) {
                    if (proto.hasOwnProperty(key)) {
                        receiver.prototype[key] = proto[key]
                    }
                }
                Object.keys(proto).forEach(function (key) {
                    receiver.prototype[key] = proto[key]
                })
            }
            else {
                var event = new Events;
                for (var key in proto) {
                    if (proto.hasOwnProperty(key)) {
                        copyProto(key)
                    }
                }
            }

            function copyProto(key) {
                receiver[key] = function () {
                    proto[key].apply(event, Array.prototype.slice.call(arguments));
                    return this
                }
            }
        };

// Execute callbacks
        function triggerEvents(list, args, context) {
            var pass = true;

            if (list) {
                var i = 0, l = list.length, a1 = args[0], a2 = args[1], a3 = args[2];
                // call is faster than apply, optimize less than 3 argu
                // http://blog.csdn.net/zhengyinhui100/article/details/7837127
                switch (args.length) {
                    case 0:
                        for (; i < l; i += 2) {
                            pass = list[i].call(list[i + 1] || context) !== false && pass
                        }
                        break;
                    case 1:
                        for (; i < l; i += 2) {
                            pass = list[i].call(list[i + 1] || context, a1) !== false && pass
                        }
                        break;
                    case 2:
                        for (; i < l; i += 2) {
                            pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass
                        }
                        break;
                    case 3:
                        for (; i < l; i += 2) {
                            pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass
                        }
                        break;
                    default:
                        for (; i < l; i += 2) {
                            pass = list[i].apply(list[i + 1] || context, args) !== false && pass
                        }
                        break;
                }
            }
            // trigger will return false if one of the callbacks return false
            return pass;
        }

        function isFunction(func) {
            return Object.prototype.toString.call(func) === '[object Function]'
        }

        return Events
    }();

    !function (exports) {
        "use strict";
        var platformPrefix = "-webkit- -o- -moz- ".split(" ");
        var needPrefixItems = "animation transform transition keyframes".split(" "),
            needRegExp = new RegExp(needPrefixItems.join('|'));
        var prefix = function(k,v){
            var i,len = platformPrefix.length,ret = [];
            if(needRegExp.test(k.toLowerCase())){
                for(i = 0;i<len;i++){
                    var tmp = platformPrefix[i];
                    ret.push(styleCreator.cssItem(tmp +k,v))
                }
            }else{
                ret.push(styleCreator.cssItem(k,v));
            }
            return ret.join('');
        }
        var styleCreator;
        styleCreator = {
            'keyframes': function (name, val) {
                var keyframe = '@{{pft}}keyframes ' + name + ' { {{code}} }', i, len = platformPrefix.length, tmp = [], ret = [], _self = this;
                each(val, function (v, k) {
                    tmp.push(_self.css(k, v))
                });
                for (i = 0; i < len; i++) {
                    ret.push(keyframe.replace(/\{\{pft\}\}/, platformPrefix[i]).replace(/\{\{code\}\}/, tmp.join(' ')));
                }
                return ret.join(' ');
            },
            'media': function (media) {
                var _self = this;
                if (!isArray(media)) {
                    media = [media];
                }
                var i = 0,
                    len = media.length,
                    _css = [];

                for (; i < len; i++) {
                    var _t = media[i],
                        query = _t.query,
                        style = _t.style,
                        ret = [];
                    each(style, function (v, k) {
                        ret.push(_self.css(k,v, true));
                    });
                    _css.push("@media " + query + " { " + ret.join(" ")+ " }");
                }
                return _css.join(' ');
            },
            'css': function (name, cnt, dot) {
                var css = (dot ? '.' : '') + name + "{ {{css}} }", ret = [];
                if (typeof cnt === 'string') {
                    ret.push(cnt);
                } else if (isObject(cnt)) {
                    each(cnt, function (v, k) {
                        ret.push(prefix(k, v));
                    })
                }
                return css.replace(/\{\{css\}\}/, ret.join(' '))
            },
            'cssItem': function (k, v) {
                return k + ':' + v + ';';
            },
            create: function (style) {
                if (!isObject(style)) {
                    throw new Error('arguments type error!');
                }
                var css = [], keyframes = style['keyframes'], _self = this;
                keyframes && (delete  style['keyframes']);
                if (keyframes) {
                    each(keyframes, function (v, k) {
                        css.push(_self.keyframes(k, v));
                    });
                }
                var media = style["media"];
                media && (delete style['media']);

                each(style, function (v, k) {
                    css.push(_self.css(k, v, true))
                });
                if (media) {
                    css.push(_self.media(media));
                }
                var _s = document.createElement('style'),
                    _style = css.join(' ');
                document.getElementsByTagName('head')[0].appendChild(_s);
                if (_s.styleSheet !== undefined) {
                    _s.styleSheet.cssText = _style;
                }else {
                    _s.appendChild(document.createTextNode(_style));
                }
                return _s;
            }
        };

        var each = function (obj, cb) {
            var key;
            for (key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                var val = obj[key];
                cb && cb.call(obj, val, key, obj);
            }
        };
        var isType = function (type) {
            return function (obj) {
                return Object.prototype.toString.call(obj) === "[object " + type +"]"
            }
        };

        var isArray = Array.isArray || isType("Array");
        var isObject = function(obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!obj;
        };
        exports.style = styleCreator;
    }(Util);

    Util.textCut = function (str, num, dot) {
        var len = Util.bLength(str),newLen = 0,newStr = "", i,tmp;

        var zhReg = /[^\x00-\xff]/g;

        if (!dot) {
            dot = '...';
        }
        for(i = 0;i<len;i++){
            tmp = str.charAt(i);
            if(zhReg.test(tmp)){
                newLen++;
            }
            newLen++;
            if(newLen >= num){
                break;
            }
            newStr += tmp;
        }
        if(dot && len > num){
            newStr += dot;
        }
        return newStr;
    };


    Util.debug = function () {
        var args = [].slice.call(arguments, 0);
        if (DEBUG) {
            console.log.apply(console, args);
        }
    };

    //function helper
    var toString = Object.prototype.toString;

    function isType(type) {
        return function (obj) {
            return toString.call(obj) === "[object " + uFirst(type) + "]";
        }
    }

    function uFirst(str) {
        str += "";
        if (str != "") {
            return str[0].toUpperCase() + str.substring(1);
        }
        return "";
    }

    function _extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

}(window);