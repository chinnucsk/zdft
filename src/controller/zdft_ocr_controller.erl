%% @author jackie
%% @doc @todo Add description to zdft_ocr_controller.


-module(zdft_ocr_controller, [Req]).

%% ====================================================================
%% API functions
%% ====================================================================
-export([]).

parse('POST', []) ->
	ocr_websocket ! {parse, {self(), Req:post_param("base64Img")}},
	receive 
		{ok, Str} ->
			{json, {ok, Str}}
	after 60000
			{json, {error, "Time out"}
	end.
		

%% ====================================================================
%% Internal functions
%% ====================================================================


