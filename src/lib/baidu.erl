%% @author jackie
%% @doc @todo Add description to baidu.


-module(baidu).

%% ====================================================================
%% API functions
%% ====================================================================
-export([register/0]).

register() ->
	{ok, R} = ibrowse:send_req(
				"http://zc.qq.com/cgi-bin/chs/numreg/get_acc", 
[{"Content-Type", "application/x-www-form-urlencoded"},
{"r", 0.45043425913900137}], post, 
<<"&verifycode=&qzone_flag=1&
country=1&province=51&
city=1&isnongli=0&year=1997&month=1&day=1&isrunyue=0&
password=416548c903479317f83d24b2c345459d59ad7d9f725eb46a2bcae12fed742e0569924be8ca76ee05a9bb2ba09e790783df95ba760f7bb63d0f921ab8cbd2733ed9813211e5bc5846fbdfc251e06975c9cde9731d7edac111845fb5266a109b56f9480594c66a391ef6a3e9deeedf6037dc113ff548349f1c1014e976101e9776&
nick=x2&email=false&
other_email=false&elevel=0&sex=1&qzdate=&jumpfrom=58030&
csloginstatus=0&w0a5q8=a6b3g8">>),
	util:p(R).

add_post() ->
	ok.

del_post() ->
	ok.

%% ====================================================================
%% Internal functions
%% ====================================================================
login() ->
	ok.


