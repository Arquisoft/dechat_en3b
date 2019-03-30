function fill_friends_list(){
    //troubleshooting
    alert("Hi I am a test");

    /** 
    var popupDialog = document.createElement("dialog open");
    var testParagraph = document.createElement("p");
    var paragrapString = document.createTextNode("This is a test");
    testParagraph.appendChild(paragrapString);
    popupDialog.appendChild(testParagraph);
    var referenceObject = document.getElementById('contactsList');
    document.body.insertBefore(popupDialog,referenceObject);
    */
   

    /** 
    <dialog open>
    <p>This is a test</p>
    </dialog>

    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // Load the person's data into the store
    const person = $('#profile').val();
    await fetcher.load(person);

    // Get their list of friends
    const friends = store.each($rdf.sym(person), FOAF('knows'));
    //$('#friends').empty();

    // Parse their friends into html elements
    friends.forEach(async (friend) => {
    await fetcher.load(friend);
    const fullName = store.any(friend, FOAF('name'));
    //$('#friends').append($('<div class="contact">').text(fullName && fullName.value || friend.value));
    document.getElementById('contactsList').append($('<div class="contact">'));
                                      });

    //var friend = contact.createElement("div");
    //Static way of declaring contacts:
    //<div class="contact"><img src="/assets/images/profile.png"> <label> Friend 1</label> </div>

    */
}