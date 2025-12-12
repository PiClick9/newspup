var Common = {
	
	getRandomNumber : function(max) {
		return parseInt(Math.random() * (max - 0) + 0);
	},
	
	ajaxGet : function(url, data, callback_success, callback_error) {
		$.ajax({
			type : 'GET',
			url : url,
			data : data,
			success : callback_success,
			error: callback_error
		});
	},
	
	ajaxPost : function(url, data, callback) {
		$.ajax({
			type : 'POST',
			url : url,
			data : data,
			processData: false,
			contentType: false,
			success : callback,
			error: function(jqXHR, textStatus, errorThrown){
				console.log('status : '+jqXHR.status);
    			console.log('ajaxPost : '+textStatus);
    		}
		});
	},
	
	ajaxForm : function(form, method, url, callback) {
		var options = {
    		url: url,
    		type: method,
    		clearForm: true,
    		resetForm: true,
    		success: callback,
    		error: function(jqXHR, textStatus, errorThrown){
    			console.log('status : '+jqXHR.status);
    			console.log('ajaxForm : '+textStatus);
    		}
    	};
		
    	form.ajaxSubmit(options);
	},
	
	numberWithCommas : function(x,decimal) {
		
		if(decimal > 0) {
			x = x.toFixed(decimal);
		} else if(decimal == 0) {
			x = Math.round(x);
		}
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	formSubmit : function(form, method, url) {
        form.attr('action',url).attr('method', method);
        form.submit();
    },
    
    replaceAll : function(str, org, dest) {
    	return str.split(org).join(dest);
    },
    
    isEmpty : function(value) {
    	if(value == '' || value == null || value == 'null' || value == undefined) {
    		return true;
    	}
    	return false;
    },
    
    isNotEmpty : function(value) {
    	if(value == '' || value == null || value == 'null' || value == undefined) {
    		return false;
    	}
    	return true;
    },
    
    duplicate : function(url, param, obj, defaulVal, message) {
    	var valid = false;
		
    	$.ajax({
			type : 'GET',
			url : url,
			data : param,
			async: false,
			success : function(data) {
				if (data == false) {
					bootbox.alert(message);
					//obj.val(defaulVal);
					obj.focus();
					valid = false;
				} else {
					valid = true;
				}
			},
			fail : function() {
				bootbox.alert('Error in checking duplicate ...');
			}
		});
    	
    	return valid;
    },
    
    setCookie : function(cName, cValue, cDay) {
    	
    	var domain = document.location.hostname;
    	
    	if(domain.indexOf('localhost') != -1) {
    		domain = 'localhost';
    	} else {
    		domain = '.newspub.kr';
    	}

    	var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ ; domain='+domain;
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    },
    
    getCookie : function(cName) {
    	cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
             start += cName.length;
             var end = cookieData.indexOf(';', start);
             if(end == -1)end = cookieData.length;
             cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);

    },
    
    parseTLD : function(data) {
    	data = decodeURIComponent(data);
    	
    	var spt = data.split('(');
    	spt = spt[1].substring(0, spt[1].length-1);
    	
    	var raw = '{';
    	var spt2 = spt.split('=');
    	for(var i=0; i<spt2.length; i++) {
    		if(i == 0) {
    			raw += '"' + spt2[i] + '"';
    		} else if(i == spt2.length-1) {
    			raw += ':"' + spt2[i] + '"';
    		} else {
    			var idx = spt2[i].lastIndexOf(',');
        		var value = spt2[i].substring(0, idx);
        		var key = spt2[i].substring(idx+2, spt2[i].length);
        		raw += ':"' + value + '","' + key + '"';
    		}
    	}
    	raw += '}';
    
    	var obj = JSON.parse(raw);
    	return obj;
    },
    
    urlEncoding : function(data) {
    	return encodeURIComponent(data).replace(/[!'()*]/g, escape);
    },
	
	getParameterByName : function(name) { 
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
		results = regex.exec(location.search); 
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 
	},
	
	getOs : function() {
		const nav = navigator.userAgent.toLowerCase();
		if(nav == null || nav == "") return "unknown";
		if(nav.indexOf('android') != -1) { 
			return "android";
		} else if(nav.indexOf("iphone") != -1 || nav.indexOf("ipad") != -1 || nav.indexOf("ipod") != -1) {
			return "ios";
		}
		return "unknown";
	}
}

function getWorldTime(date, timezone) {
	
	var diffTime = 9;
	//var format = 'yyyy-MM-dd HH:mm';
	var format = 'YYYY-MM-DD HH:mm';
	
	var inputDate = new Date(date);
	//var d = new Date(inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000) + (diffTime * 1000 * 60 * 60));
	var d = moment(new Date(date)).zone("+09:00");
	
	return d.format(format);
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

function removeHtmlEncAndSpecialChar(str) {
	if(str == "" || str == null){
        return str;
    } else{
		var regExp1 = /&[a-zA-Z0-9]*;/gi;
		str = str.replace(regExp1, "");
		var regExp2 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
		str = str.replace(regExp2, " ");
		return str;
    }
}