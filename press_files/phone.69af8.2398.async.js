 function CallTracking(){ this.startCall = function(call){}; this.startCallAdditionalScript = function(call){}; this.endCall = function(call){}; this.endCallAdditionalScript = function(call){}; var _startCallEvents = []; var _endCallEvents = []; this.on = function(eventName, callback){ if(eventName == "startCall"){ _startCallEvents.push(callback); }else if(eventName == "endCall"){ _endCallEvents.push(callback); } }; this._notifyStartCall = function(call){ for(eventIndex in _startCallEvents){ _startCallEvents[eventIndex](call); } }; this._notifyEndCall = function(call){ for(eventIndex in _endCallEvents){ _endCallEvents[eventIndex](call); } } }; callTracking = new CallTracking(); var umtz_data = false; var new_z = ""; var force_ct_source_detection = false; var ct_dynamic_started = false; var win_chr; var charmap = unescape("%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457"); var ct_blockUser = 0; function code2char(code) { if (code >= 0xC0 && code <= 0xFF) { return String.fromCharCode(code - 0xC0 + 0x0410); } if (code >= 0x80 && code <= 0xBF) { win_chr++; return charmap.charAt(code - 0x80); } return String.fromCharCode(code); } function winToUnicode(str) { win_chr = 0; str = unescape(str); var res = ""; for(var i = 0; i < str.length; i++) { res = res + code2char(str.charCodeAt(i)); } return res; } function utf8_decode(str) { var string = ""; var i = 0; var c = c1 = c2 = 0; str = unescape(str); while ( i < str.length ) { c = str.charCodeAt(i); if (c < 128) { string += String.fromCharCode(c); i++; } else if((c > 191) && (c < 224)) { c2 = str.charCodeAt(i+1); string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); i += 2; } else { c2 = str.charCodeAt(i+1); c3 = str.charCodeAt(i+2); string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); i += 3; } } return string; } function convertEncoding(str) { var result = winToUnicode(str); if ( 0 < win_chr ) { result = utf8_decode(str); } return result; } function _uGC(l,n,s) { if (!l || l=="" || !n || n=="" || !s || s=="") { return "-"; } var i,i2,i3,c="-"; i=l.indexOf(n); i=l.indexOf(n); i3=n.indexOf("=")+1; if (i > -1) { i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; } c=l.substring((i+i3),i2); } return c; } function _getQuerystring(string, key, default_) { if ( default_==null ) { default_=""; } var search = unescape(string); if ( search == "" ) { return default_; } search = search.substr(1); search = search.replace("?","&"); search = search.replace("?","&"); search = search.replace("#","&"); search = search.replace("/",""); var params = search.split("&"); for (var i = 0; i < params.length; i++) { var pairs = params[i].split("="); if(pairs[0] == key) { return pairs[1]; } } return default_; } function ct_cc(){ if(typeof punycode == "undefined"){ _deleteCookie("ct_bounce_static_prev_z", "/", location.host.replace('www.','')); _deleteCookie("ct_bounce_static", "/", location.host.replace('www.','')); _deleteCookie("__utmz", "/", location.host.replace('www.','')); _deleteCookie("__imz", "/", location.host.replace('www.','')); _deleteCookie("__ctcid", "/", location.host.replace('www.','')); _deleteCookie("ct_yclid", "/", location.host.replace('www.','')); }else{ _deleteCookie("ct_bounce_static_prev_z", "/", punycode.ToASCII(location.host.replace('www.',''))); _deleteCookie("ct_bounce_static", "/", punycode.ToASCII(location.host.replace('www.',''))); _deleteCookie("__utmz", "/", punycode.ToASCII(location.host.replace('www.',''))); _deleteCookie("__imz", "/", punycode.ToASCII(location.host.replace('www.',''))); _deleteCookie("__ctcid", "/", punycode.ToASCII(location.host.replace('www.',''))); _deleteCookie("ct_yclid", "/", punycode.ToASCII(location.host.replace('www.',''))); } console.log("ct cookies cleared"); }; function _setCookie (name, value, expires, path, domain, secure, dont_escape) { value = ((dont_escape) ? value : escape(value));document.cookie = name + "=" + value + ((expires) ? "; expires=" + expires : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : ""); } function _getCookie(name) { var cookie = " " + document.cookie; var search = " " + name + "="; var setStr = null; var offset = 0; var end = 0; if (cookie.length > 0) { offset = cookie.indexOf(search); if (offset != -1) { offset += search.length; end = cookie.indexOf(";", offset); if (end == -1) { end = cookie.length; } setStr = unescape(cookie.substring(offset, end)); } } return(setStr); } function _deleteCookie(name, path, domain) { _setCookie(name, null, new Date(0), path, domain); }String.prototype.replaceAll = function(search, replace){ if ( "function" == typeof(this.split) ) { return this.split(search).join(replace); } return ""; };String.prototype.translit = (function(){ var L = { 'А':'A','а':'a','Б':'B','б':'b','В':'V','в':'v','Г':'G','г':'g', 'Д':'D','д':'d','Е':'E','е':'e','Ё':'Yo','ё':'yo','Ж':'Zh','ж':'zh', 'З':'Z','з':'z','И':'I','и':'i','Й':'Y','й':'y','К':'K','к':'k', 'Л':'L','л':'l','М':'M','м':'m','Н':'N','н':'n','О':'O','о':'o', 'П':'P','п':'p','Р':'R','р':'r','С':'S','с':'s','Т':'T','т':'t', 'У':'U','у':'u','Ф':'F','ф':'f','Х':'Kh','х':'kh','Ц':'Ts','ц':'ts', 'Ч':'Ch','ч':'ch','Ш':'Sh','ш':'sh','Щ':'Sch','щ':'sch','Ъ':'"','ъ':'"', 'Ы':'Y','ы':'y','Ь':"'",'ь':"'",'Э':'E','э':'e','Ю':'Yu','ю':'yu', 'Я':'Ya','я':'ya' }, r = '', k; for (k in L) r += k; r = new RegExp('[' + r + ']', 'g'); k = function(a){ return a in L ? L[a] : ''; }; return function(){ if ( "function" == typeof(this.replace) ) { return this.replace(r, k); } else { return ""; } }; })(); function replace_phone(el_id, html_text) { var el = null;if ( "@" == el_id[0] ) { rdst = el_id.substring(1); clearrdst = rdst.replace(/ /g, ""); clearrdst = clearrdst.replace(/\+/g, ""); clearrdst = clearrdst.replace(/\-/g, ""); clearrdst = clearrdst.replace(/\(/g, ""); clearrdst = clearrdst.replace(/\)/g, ""); clearrdst = clearrdst.replace(/\,/g, ""); clearrdst = clearrdst.translit(); class_name = "ct_lr_"+clearrdst; jQuery("body *:contains('"+rdst+"')").add('body').contents().each(function(){ if ( this.nodeType == Node.TEXT_NODE && -1 != jQuery(this).text().indexOf(rdst)) { jQuery(this).parent().addClass(class_name); } }); jQuery('.'+class_name).attr('prev_num'+clearrdst, rdst); jQuery('.'+class_name).each(function(){ prev_num = jQuery(this).attr('prev_num'+clearrdst); if(!jQuery(this).is('script')){ var ct_lazy = jQuery(this).html(); ct_lazy = ct_lazy.split(prev_num).join(html_text); ct_lazy=ct_lazy.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, ""); jQuery(this).html(ct_lazy); jQuery(this).attr('prev_num'+clearrdst, html_text);} }); } else if ( "." == el_id[0] ) { jQuery(el_id).html(html_text); } else { jQuery(el_id).html(html_text); } }ct_geoCity = "defined";ct_userIP = "defined"; function isGaLoaded(num_tries) { if ( typeof(ct_geoCity) == "undefined" || typeof(jQuery) == "undefined" ) { if ( 10 > num_tries ) { setTimeout("isGaLoaded(" + (num_tries+1) + ");", 500); } } else { umtz_data = { ct_source: "", ct_medium: "", ct_term: "", ct_campaign: "", ct_content: "", ct_gclid: "", ct_yclid: "", ct_referrer: "" };umtz_data.ct_source = _getQuerystring(location.search, "utm_source","-").toLowerCase(); umtz_data.ct_medium = _getQuerystring(location.search, "utm_medium","-").toLowerCase(); umtz_data.ct_campaign = convertEncoding(_getQuerystring(location.search, "utm_campaign","-")).toLowerCase(); umtz_data.ct_term = convertEncoding(_getQuerystring(location.search, "utm_term","-")).toLowerCase(); umtz_data.ct_content = convertEncoding(_getQuerystring(location.search, "utm_content","-")).toLowerCase(); umtz_data.ct_gclid = _getQuerystring(location.search, "gclid","-"); umtz_data.ct_referrer = convertEncoding(_getQuerystring(location.search, "utm_referrer",document.referrer)).toLowerCase(); if ( umtz_data.ct_gclid != "-" ) { umtz_data.ct_source = "google"; umtz_data.ct_medium = "cpc"; } var z = _uGC(document.cookie, "__utmz=", ";"); if ( _uGC(document.cookie, "__imz=", ";") != "-" || force_ct_source_detection ){ var z = _uGC(document.cookie, "__imz=", ";"); }if ( "" == umtz_data.ct_term || "-" == umtz_data.ct_term ) { if ( -1 != umtz_data.ct_referrer.indexOf("mail.ru") && "-" != _getQuerystring(umtz_data.ct_referrer, "q","-") ) { var term = convertEncoding(_getQuerystring(umtz_data.ct_referrer, "q","-")).toLowerCase(); } if ( -1 != umtz_data.ct_referrer.indexOf("google") ) { var term = convertEncoding(_getQuerystring(umtz_data.ct_referrer, "q","-")).toLowerCase(); } if ( -1 != umtz_data.ct_referrer.indexOf("yandex") ) { var term = convertEncoding(_getQuerystring(umtz_data.ct_referrer, "text","-")).toLowerCase(); } umtz_data.ct_term = term; } if ( "-" != umtz_data.ct_source || "-" != umtz_data.ct_medium || "-" != umtz_data.ct_campaign ) { var new_z = "utmcsr="+umtz_data.ct_source+"|utmccn="+umtz_data.ct_campaign+"|utmcmd="+umtz_data.ct_medium+"|utmctr="+umtz_data.ct_term+"|utmcct="+umtz_data.ct_content+"|utmgclid="+umtz_data.ct_gclid; } else if ( z != "" && z != "-" ) { var new_z = ""; } else if ( "" != umtz_data.ct_referrer && -1 == umtz_data.ct_referrer.split("/")[2].indexOf(document.location.host) ) { var referrer = umtz_data.ct_referrer.match(/^(https?\:)\/\/(www.)?(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/i); if ( null==referrer ) { var new_z = "utmcsr="+umtz_data.ct_referrer+"|utmccn=(referral)|utmcmd=referral|utmctr=-|utmcct=-"; } else { var new_z = "utmcsr="+referrer[3]+"|utmccn=(referral)|utmcmd=referral|utmctr=-|utmcct=-"; } if ( -1 != umtz_data.ct_referrer.indexOf("mail.ru") && "-" != _getQuerystring(umtz_data.ct_referrer, "q","-") ) { var new_z = "utmcsr=mail.ru|utmccn=(organic)|utmcmd=organic|utmctr="+term+"|utmcct=-"; } if ( -1 != umtz_data.ct_referrer.indexOf("google") ) { var new_z = "utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr="+term+"|utmcct=-"; } if ( -1 != umtz_data.ct_referrer.indexOf("google") && -1 != umtz_data.ct_referrer.indexOf("plus") ) { var new_z = "utmcsr=plus.google|utmccn=(referral)|utmcmd=referral|utmctr=-|utmcct=-"; } if ( -1 != umtz_data.ct_referrer.indexOf("market.yandex") ) { var new_z = "utmcsr=market.yandex.ru|utmccn=(organic)|utmcmd=organic|utmctr="+term+"|utmcct=-"; } else if( -1 != umtz_data.ct_referrer.indexOf("maps.yandex") ) { var new_z = "utmcsr=maps.yandex.ru|utmccn=(organic)|utmcmd=organic|utmctr="+term+"|utmcct=-"; } else if ( -1 != umtz_data.ct_referrer.indexOf("yandex") ) { var new_z = "utmcsr=yandex|utmccn=(organic)|utmcmd=organic|utmctr="+term+"|utmcct=-"; } } else { var new_z = "utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)|utmctr=-|utmcct=-"; } if ( new_z != "" && new_z != "-" ) { var milisecs = new Date().getTime(); var sevenmonth = new Date(milisecs+1000*60*60*24*210); _setCookie("__utmz", new_z , sevenmonth,"/",location.host.replace('www.',''),"", 1); _setCookie("__imz", new_z , sevenmonth,"/",location.host.replace('www.',''),"", 1); } ct_core(); } } function ct_dynamic_script(source_id, pr_id) { if ( ct_dynamic_started ) { return false; } if (_uGC(document.cookie,"__imz=",";") == "-"){var z = unescape(_uGC(document.cookie, "__utmz=", ";")); } else {var z = unescape(_uGC(document.cookie, "__imz=", ";")); } var v = _uGC(document.cookie, "__utmv=", ";"); var a = _uGC(document.cookie, "__utma=", ";"); var y = _uGC(document.cookie, "ct_yclid=", ";"); var __ctcid = _uGC(document.cookie, "__ctcid=", ";"); var u = _uGC(document.cookie, "ct_u_69af8=", ";"); var uv = _uGC(document.cookie, "ct_v_69af8=", ";"); var experimental = _uGC(document.cookie, "experimental=", ";"); var ban_dynamics = _uGC(document.cookie, "ban_dynamics=", ";"); var is_user_call = _uGC(document.cookie, "is_user_call=", ";"); var resolution = "na"; if ( self.screen ) { resolution = screen.width+"x"+screen.height; } if ( ban_dynamics == 1 ) { return; } var ip = ""; cook = "__ctcid="+__ctcid+"; __utma="+a+"; __utmz="+z+'; ct_u_69af8='+u+'; __utmv='+v+'; ct_v_69af8='+uv+'; ct_yclid='+y+'; is_user_call='+is_user_call; var ct = document.createElement('script'); ct.type = 'text/javascript'; var prot = (document.location.protocol === 'https:' ? 'https:' : 'http:'); var ctcid = ''; if ( 'undefined' != typeof(ga) ) { ga(function(tracker) { ctcid = tracker.get('clientId'); }); } if ( experimental == 1 ) { ct.src = prot+'//metal.calltracking.ru/dynamic/dynamic7_experimental.js?pr=2398&ctcid='+ctcid+'&bs='+source_id+'&client_url='+escape(window.location.href)+'&client_cook='+cook+'&referer='+escape(document.referrer)+'&nc='+Math.floor(new Date().getTime()/3000); } else { if(pr_id){ prid = pr_id; }else{ prid = 2398; } ct.src = prot+'//metal.calltracking.ru/dynamic/dynamic7.js?pr='+prid+'&ctcid='+ctcid+'&bs='+source_id+'&client_url='+escape(window.location.href)+'&client_cook='+cook+'&referer='+escape(document.referrer)+'&res='+resolution+'&nc='+Math.floor(new Date().getTime()/3000);} var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ct, s); ct_dynamic_started = true; } umtz_data = false; var sorce_id; function ct_core() { var tmp = ""; if(typeof(umtz_data) != "undefined" && typeof(umtz_data.ct_content) != "undefined"){ tmp = umtz_data.ct_content; } umtz_data = { ct_source: "", ct_medium: "", ct_term: "", ct_campaign: "", ct_gclid: "", ct_yclid: "", ct_content: tmp, ct_referrer: "", ct_landing: "" }; var z = _uGC(document.cookie, "__utmz=", ";"); if ( _uGC(document.cookie, "__imz=", ";") != "-" ){ var z = _uGC(document.cookie, "__imz=", ";"); } umtz_data.ct_source = _uGC(z, "utmcsr=", "|").toLowerCase(); umtz_data.ct_medium = _uGC(z, "utmcmd=", "|").toLowerCase(); umtz_data.ct_term = convertEncoding(_uGC(z, "utmctr=", "|")).toLowerCase(); umtz_data.ct_term_pad = (" "+umtz_data.ct_term+" ").toLowerCase(); umtz_data.ct_campaign = _uGC(z, "utmccn=", "|").toLowerCase(); umtz_data.ct_gclid = _uGC(z, "utmgclid=", "|"); umtz_data.ct_referrer = convertEncoding(_getQuerystring(location.search, "utm_referrer",document.referrer)); umtz_data.ct_landing = _uGC(z, "landing=", "|"); if ( "" == umtz_data.ct_content || "-" == umtz_data.ct_content ) { if ( "-" != _uGC(z, "utmcntnt=", "|") ) { umtz_data.ct_content = _uGC(z, "utmcntnt=", "|"); } if ( "-" != _uGC(z, "utmcct=", "|") ) { umtz_data.ct_content = _uGC(z, "utmcct=", "|"); } } umtz_data.ct_yclid = _getQuerystring(location.search, "yclid","-").toLowerCase(); if ( "-" == umtz_data.ct_yclid) { var ct_yclid = _getCookie("ct_yclid"); if (ct_yclid != null){ umtz_data.ct_yclid = ct_yclid; } } else { var today = new Date(); var milisecs = Date.parse(today+""); var sevenmonth = new Date(milisecs+1000*60*60*24*30*7); _setCookie("ct_yclid", umtz_data.ct_yclid , sevenmonth,"/",location.host.replace('www.','')); } if ( umtz_data.ct_gclid != "-" ) { umtz_data.ct_source = "google"; umtz_data.ct_medium = "cpc"; } match = false; sorce_id = 0; code = "495"; tel = ""; if (!match && ((('(direct)' == umtz_data.ct_source) && ('(direct)' == umtz_data.ct_campaign || 'direct' == umtz_data.ct_campaign)))) { replace_phone("@8 (495) 223 88 88","8 (495) 357 14 08"); replace_phone("@8 (800) 700 16 88","&nbsp;"); replace_phone("@223-8888","357 14 08"); replace_phone("@(495) 223-88-88","(495) 357 14 08"); match = true; match_static = true; code = "495"; tel = "357 14 08"; sorce_id = 26798; } if (!match && ((('yandex' == umtz_data.ct_source) && ('organic' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(26782); match = true; match_static = true; code = "495"; tel = "357 21 56"; sorce_id = 26782; } if (!match && ((('yandex' == umtz_data.ct_source) && ('cpc' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(26784); match = true; match_static = true; code = "495"; tel = "357 21 13"; sorce_id = 26784; } if (!match && ((('google' == umtz_data.ct_source) && ('organic' == umtz_data.ct_medium)))) { replace_phone("@8 (495) 223 88 88","8 (495) 357 29 54"); replace_phone("@8 (800) 700 16 88","&nbsp;"); replace_phone("@223-8888","357 29 54"); replace_phone("@(495) 223-88-88","(495) 357 29 54"); match = true; match_static = true; code = "495"; tel = "357 29 54"; sorce_id = 26786; } if (!match && ((('google' == umtz_data.ct_source) && ('cpc' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(26788); match = true; match_static = true; code = "495"; tel = "357 21 53"; sorce_id = 26788; } if (!match && ((('go.mail.ru' == umtz_data.ct_source || 'rambler' == umtz_data.ct_source || 'bing' == umtz_data.ct_source || 'yahoo' == umtz_data.ct_source || 'ask' == umtz_data.ct_source) && ('organic' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(26794); match = true; match_static = true; code = "495"; tel = "357 29 52"; sorce_id = 26794; } if (!match && ((('yandex_tehno' == umtz_data.ct_source || 'google_tehno' == umtz_data.ct_source) && ('cpc' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(58573); match = true; match_static = true; code = "495"; tel = "357 21 67"; sorce_id = 58573; } if (!match && ((('yandex_butovo' == umtz_data.ct_source || 'google_butovo' == umtz_data.ct_source) && ('cpc' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(58575); match = true; match_static = true; code = "495"; tel = "357 21 46"; sorce_id = 58575; } if (!match && ((('yandex_dom_na_lusinovskoy' == umtz_data.ct_source) && ('cpc' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(58579); match = true; match_static = true; code = "495"; tel = "357 29 47"; sorce_id = 58579; } if (!match && ((('bd' == umtz_data.ct_medium)) || (('banner' == umtz_data.ct_medium)) || (('tgb' == umtz_data.ct_medium)))) { match_dynamic = true; ct_dynamic_script(26800); match = true; match_static = true; code = "495"; tel = "357 10 24"; sorce_id = 26800; } if(typeof match != undefined && typeof match !="undefined" && match == true){ setTimeout(function(){ setInterval(function(){ if(typeof(assigned_phone) != "undefined"){ replace_phones(); }else{ replace_phone( '@8 (495) 223 88 88', '8 ('+code+') '+tel ); } }, 500); },500); } if ( match ) { selector = 'a[href^="tel:"]'; jQuery(selector).attr('href','tel:' + '+7'+code+ tel.replaceAll(/\s|-/, '')); } } ct_geoCity = "defined";ct_userIP = "defined";isGaLoaded(1);