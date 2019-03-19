
async function login() {
	let session = await solid.auth.currentSession();
	if(!session) {
		let popupUri = 'https://solid.community/common/popup.html';
		if (!session)
			session = await solid.auth.popupLogin({popupUri});
		alert(`Logged in as ${session.webId}`);
	}
	else if(session && !logging){
		solid.auth.logout()
			.then(() => alert('Goodbye!'));
	}
}

async function checkLogin(){
	await solid.auth.trackSession(session => {
		if(!session) alert('The user is not logged in');
		else alert(`The user is ${session.webId}`);
	});
}

window.onload = function (){
	$("#chatsList").children().on('click', select);
	
	$('#received').on('click', login);
}