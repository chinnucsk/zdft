%% @author jackie
%% @doc @todo Add description to zdft_ocr_websocket.

-module(zdft_ocr_websocket).
-behaviour(boss_service_handler).
-compile([{parse_transform, lager_transform}]).
%% users is a dict, store WebsocketId <-->SessionId
%% pids is a dict, store WebsocketId <--> Pid (This Pid is that sending messages to mine directly)
-record(state,{users}).

%% API
-export([init/0, 
	handle_incoming/5, 
	handle_join/4, 
	handle_close/4, 
	handle_info/2,
	terminate/2]).

%%--------------------------------------------------------------------
%% Function: init(Args) -> {ok, State} |
%%                         {ok, State, Timeout} |
%%                         ignore               |
%%                         {stop, Reason}
%% Description: Initiates the server
%%--------------------------------------------------------------------
init() ->
  io:format("~p ~p(~p) starting...~n", [?MODULE, ?LINE, self()]),
  lager:info("init~p", [?MODULE, ?LINE]),
  %timer:send_interval(1000, ping),
  {ok, #state{users=dict:new()}}.

%%--------------------------------------------------------------------
%% to handle a connection to your service
%%--------------------------------------------------------------------
handle_join(_ServiceName, WebSocketId, SessionId, State) ->
	io:fwrite("a client joined"),
    #state{users=Users} = State,
    {reply, ok, State#state{users=dict:store(WebSocketId,SessionId,Users)}}.
%%--------------------------------------------------------------------


%%--------------------------------------------------------------------
%% to handle a close connection to you service
%%--------------------------------------------------------------------
handle_close(ServiceName, WebSocketId, _SessionId, State) ->
    #state{users=Users} = State,
    {reply, ok, State#state{users=dict:erase(WebSocketId,Users)}}.
%%--------------------------------------------------------------------


%%--------------------------------------------------------------------
%% to handle incoming message to your service
%% here is simple copy to all
%%--------------------------------------------------------------------
handle_incoming(_ServiceName, WebSocketId,_SessionId, Message, State) ->
    %%io:format("Received Message:~p", [Message]),
	Json = jsx:decode(Message),
	Pid_dec = proplists:get_value(<<"pid">>, Json),
	Pid = list_to_pid(Pid_dec),
	Code = proplists:get_value(<<"code">>, Json),
	io:format("Sending response:~p back to ~p", [Code, Pid]),
	Pid ! {ok, Code},				 
    {noreply, State}.
	
%%--------------------------------------------------------------------


handle_info({parse, {Pid, Img}}, State) ->
    #state{users=Users} = State,
	WebSockets = dict:fetch_keys(Users),
	case WebSockets of
		[] ->
			{noreply, State};
		[WebSocketId|_Tail] ->
			io:format("To save pid:~p", [Pid]),
			Props = [{<<"img">>, list_to_binary(Img)}, {<<"pid">>, pid_to_list(Pid)}],
			Json = jsx:encode(Props),
			WebSocketId ! {text, Json},
			{noreply, State}
	end;
handle_info(ping, State) ->
	error_logger:info_msg("pong:~p~n", [now()]),
	{noreply, State};
handle_info(state, State) ->
    #state{users=Users} = State,
	All = dict:fetch_keys(Users),
	error_logger:info_msg("state:~p~n", [All]),
  {noreply, State};
handle_info(_Info, State) ->
  {noreply, State}.


terminate(_Reason, _State) ->
   %call boss_service:unregister(?SERVER),
  ok.

%% Internal functions

%% ====================================================================
%% Internal functions
%% ====================================================================


