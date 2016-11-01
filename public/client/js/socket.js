Lemonade.Socket.onopen = function() {
	Lemonade.Interface.Loader.showLoader();
	Lemonade.Interface.Loader.start();

	var message = new Lemonade.Message.toServer(1);
	message.add(clientParameters["sso"]);
	Lemonade.Socket.send(message.string());
};

Lemonade.Socket.onclose = function() {
	var alert = new Lemonade.Interface.alert(300, 200);
	alert.setContent('<div style="padding:10px;font-size:12px;">Hotel offline.</div>');
	alert.setTitle("Bericht van Hotel Management");
	alert.getElement().show();
	alert.center();
};