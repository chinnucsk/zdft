%% @author jackie
%% @doc @todo Add description to zdft_ocr_controller.


-module(zdft_ocr_controller, [Req]).
-compile(export_all).
%% ====================================================================
%% API functions
%% ====================================================================
-export([]).

register('POST', []) ->
  Code = Req:post_param("code"),
	lager:debug("Code is:~p", [Code]),
	{output, "<html><head><title>Result</title></head><body><div id=number >" ++ Code ++ "</div></body></html>"}.

parse('POST', []) ->
	[{uploaded_file, FileName, Path, Length}] = Req:post_files(),
	lager:debug("save upload file ~s to:~s", [FileName, Path]),
	%%{ok, Bin} = file:read_file(Path),
    %%Base64 = base64:encode(Bin),
	%%global:send(zdft_ocr_websocket, {parse, {self(), Base64}}),
	"./priv" ++ Img_path = Path,
	lager:debug("image src will be set to:~p", [Img_path]),
	global:send(zdft_ocr_websocket, {parse, {self(), Img_path}}),
 	receive 
 		{ok, Str} ->
      lager:debug("Received code:~p", [Str]),
 			%%{json, {ok, Str}}
			{output, Str}
 	after 60000 ->
 			%%{json, {error, "Time out"}},
			%%file:delete(Path),
			{output, "Error: time out"}
			
 	end.

%% ====================================================================
%% Internal functions
%% ====================================================================


