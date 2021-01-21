var $={
    ajax:function(options){
        var xhr=null,       //XMLHttpRequest对象
            url=options.url,//url地址
            method =options.method||'get',//传输方式,默认为GET
            async= typeof(options.async) === "undefined"?true:options.async,
            data = options.data || null,
            params='',                              //data参数
            callback=options.success,               //AJAX请求成功的回调函数   
            error=options.error;                          
            //将data的对象字面量形式转换为string形式 
            if(data){
                for (var i in data) {
                    params+=i+'='+data[i]+'&';
                    
                }
                params=params.replace(/&$/,"");
                console.log(params);
            }

            //根据method的值改变url
            if(method==="get"){
                url += '?'+params;
            }
            console.log(url);

        if(typeof XMLHttpRequest != "undefined"){
            xhr = new XMLHttpRequest();
        }else if(typeof ActiveXObject != "undefined"){
            //所有可能出现的ActiveXObject版本放在一个数组
            var xhrArr =['Microsoft.XMLHTTP','MSXML2.XMLHTTP.6.0',
                         'MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0',
                         'MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP.2.0'];
            //遍历创建XMLHttpRequest
            var len=xhrArr.length;
            for (let i = 0; i < xhrArr.length; i++) {
                try {
                    //创建XMLHttpRequest对象
                    xhr=new ActiveXObject(xhrArr[i]);
                    break;
                } catch (ex) {
 
                } 
            }
        }else{
            throw new Error('NO XHR object available.');
        }
        //响应XML状态变化的函数
        xhr.onreadystatechange=function(){
            if (xhr.readyState===4) {
                if ((xhr.status>=200 && xhr.status<300) || xhr.status === 304) {
                    callback && callback(JSON.parse(xhr.responseText));
                }else{
                    error && error();
                }
            }
        }
        //22222222222222222222
        //创建请求
        xhr.open(method,url,async);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(params);
    },
    jsonp:function(){

    }
}
//1111111111111111111111111111111
//AJAX参数
// $.ajax({
//     url:"http://class.imooc.com/api/jsonp",
//     method:"post",
//     async:false,
//     data:{username:'11112222', pwd:'22221111'},
//     success:function(){

//     },
//     error:function() {
        
//     }

// })

