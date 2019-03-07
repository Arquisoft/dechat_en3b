let logging = false;

function select(){
	$("#chatsList").children().toggleClass('selectedChatElement', false);
	$(this).toggleClass('selectedChatElement');
}

function load(){

}

async function login() {
	let session = await solid.auth.currentSession();
	if(!session && !logging) {
		logging = true;
		let popupUri = 'https://solid.community/common/popup.html';
		if (!session)
			session = await solid.auth.popupLogin({popupUri});
		alert(`Logged in as ${session.webId}`);
	}
	else if(session && !logging){
		logging  = true;
		solid.auth.logout()
			.then(() => alert('Goodbye!'));
	}
	logging = false;
}

function checkLogin(){
	solid.auth.trackSession(session => {
		if(!session) alert('The user is not logged in');
		else alert(`The user is ${session.webId}`);
	});
}

function getMessages(contact){

}
function getContacts(){

}

window.onload = function (){
	$("#chatsList").children().on('click', select);
	
	$('#received').on('click', login);
	
}