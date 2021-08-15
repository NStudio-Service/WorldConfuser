let originHtml = http.get(downloadUrl, {
	headers: {
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
		'accept-language': 'zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7'
	}
}).body.string();
let fn_code = / src="\/fn\?(.+)" frameborder="0" scrolling="no"><\/iframe>\n/g.exec(originHtml)[1];

let loadingHtml = http.get("https://wwe.lanzoui.com/fn?" + fn_code, {
	headers: {
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
		'accept-language': 'zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7'
	}
}).body.string();
let ajaxdata = /		(var ajaxdata = '.+';)/g.exec(loadingHtml)[1],
	postdown = /';\n		(var .* = '.[a-zA-Z_0-9]+';)/g.exec(loadingHtml)[1];
let data = eval(ajaxdata + postdown + "(" + /data : ({ '.*' }),/g.exec(loadingHtml)[1] + ")");

let ajaxJson = http.post("https://wwe.lanzoui.com/ajaxm.php", data, {
	headers: {
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
		'referer': "https://wwe.lanzoui.com/fn?" + fn_code,
		'accept-language': 'zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7'
	}, contentType: 'application/x-www-form-urlencoded'
}).body.json();
(ajaxJson.dom + "/file/" + ajaxJson.url);
