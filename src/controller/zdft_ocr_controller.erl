%% @author jackie
%% @doc @todo Add description to zdft_ocr_controller.


-module(zdft_ocr_controller, [Req]).
-compile(export_all).
%% ====================================================================
%% API functions
%% ====================================================================
-export([]).

parse('POST', []) ->
	[{uploaded_file, FileName, Path, Length}] = Req:post_files(),
	{ok, Bin} = file:read_file(Path),
    Base64 = base64:encode(Bin),
	global:send(zdft_ocr_websocket, {parse, {self(), Base64}}),
 	receive 
 		{ok, Str} ->
 			%%{json, {ok, Str}}
			{output, Str}
 	after 60000 ->
 			%%{json, {error, "Time out"}},
			file:delete(Path),
			{output, "Error: time out"}
			
 	end.

%% ====================================================================
%% Internal functions
%% ====================================================================


