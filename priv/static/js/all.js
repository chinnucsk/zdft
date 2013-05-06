
function updateContainer( url ){
    dynamicCon = '#dynamicContainer';    
    ObjTag = $( dynamicCon );
    ObjTag.load( url );
}

$(function(){
	var addr; 
	$( "#test").click(function () {
         alert( "button is clicked" );
         $( "#testImg" ).attr("src", addr);
   });

	var ws = new WebSocket("ws://localhost:8001/websocket/ocr");
	//var pid;
    ws.onopen = function()
    {
       // Web Socket is connected, send data using send()
       
    };
    ws.onmessage = function (evt) 
    { 
       var received_msg = evt.data;
       var json = JSON.parse(received_msg);
       var pid = json.pid;
       //pid = json.pid;
       //var base64img = json.img;
       //alert("pid is: " + pid);
       alert("img is:" + json.img);
       var div2 = '<div><p>Taken from wikpedia</p><img src="data:image/png;base64,' + json.img +
       '" alt="Red dot" /></div>';
       var div = '<div pid=' + json.pid + ' ><p>Taken from wikpedia</p> ' +
           '<img src="data:image/png;base64, ' + json.img +   
    	   '" alt="Red dot" />' +
    	   '<input type=text /><input type=button />' +
           '</div>';
       var div3 = '<div><p>Taken from wikpedia</p><img src="' +
           json.img +
    	   '" alt="Red dot" /> \
   </div>';
              
        
       addr = json.img;
       //$('body').html(div3);
       //showImage(json);
       //updateContainer('<img src="' + json.img + '" alt="Red dot" />');
       $( "#testImg" ).attr("src", json.img);
       
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
       // websocket is closed.
       alert("Connection is closed..."); 
    };
    
    function uploadStarted() {
        $get("imgDisplay").style.display = "none";
    }
    
    function showImage(json) {
        
            alert("img src set to:" + json.img);
            $("#imgDisplay").attr("src", json.img);
        
    }
   
});
	
	


      
      
	