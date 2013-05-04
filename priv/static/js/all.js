$(function(){
	var ws = new WebSocket("ws://localhost:8001/websocket/ocr");
    ws.onopen = function()
    {       
    };
    ws.onmessage = function (evt) 
    { 
       var received_msg = evt.data;
       var json = JSON.parse(received_msg);
       var pid = json.pid;
       var div = '<div pid=' + json.pid + ' ><p>Taken from wikpedia</p> ' +
           '<img src="data:image/png;base64, ' + json.img +   
    	   '" alt="Red dot" />' +
    	   '<input type=text /><input type=button />' +
           '</div>';
       $('body').append(div);
       $(":button").click(function(e){
       	var pid_str = $(this).parent().attr("pid");
       	var pid = pid_str.split(",").map(function(data){return +data;});  
       	var code = $(this).prev().val();
       	var json = {pid:pid, code:code};
        var string = JSON.stringify(json); 
        ws.send(string);
       });
    };
    ws.onclose = function()
    { 
       alert("Connection is closed..."); 
    };   
});
	
	


      
      
	