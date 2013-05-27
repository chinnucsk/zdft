    $(function(){
           /*
              if (window.WebSocket){
                  alert("support WebSocket");
              } else {
                  alert ("Don't support Web socket");
              }
             */
    /*
            $( ":button").bind('click' , function(){
            alert( "button is clicked" );
            $( "#testImg" ).attr("src", "/static/chicago-boss.png" );
            });

            $( ":button").click(function () {
            alert( "button is clicked" );
            $( "#testImg" ).attr("src", "/static/chicago-boss.png" );
            });
    */

            var ws = new WebSocket("ws://localhost:8001/websocket/ocr");
            ws.onopen = function()  {
           // Web Socket is connected, send data using send()
            alert("websocket opened");

            };

           ws.onmessage = function (evt)   {
               var received_msg = evt.data;
               var json = JSON.parse(received_msg);
               var pid = json.pid;
               //alert("img is:" + json.img);
               //$( "#testImg" ).attr("src",  json.img);

               /*
               var div1 = '<div><p>Taken from wikpedia</p><img src="data:image/png;base64,' + json.img +
               '" alt="Red dot" /></div>';
               */
               var div2 = '<div pid=' + json.pid + ' ><p>Please help decode:</p> ' +
                   '<img src="' + json.img +
                   '" alt="Error" />' +
                   '<input type=text /><input type=button value=Submit />' +
                   '</div>';

               /*
               var div3 = '<div><p>Please help decode </p><img src="' +
                   json.img +
                   '" alt="Error" /><input type="text" /><input type="button" value="Submit" /></div>';
               */
               $("body").append(div2);

               $(":button").click(function(e) {
                var pid_str = $(this).parent().attr("pid");
                var pid = pid_str.split(",").map(function(data){return +data;});
                var code = $(this).prev().val();
                var json = {pid:pid, code:code};
                var string = JSON.stringify(json);
                alert("sending json is:" + string);
                ws.send(string);
               });

        };

        ws.onclose = function()
        {
           alert("Connection is closed...");
        };

    });