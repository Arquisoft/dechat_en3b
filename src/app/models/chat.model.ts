export class Chat {
    chatName: String;
    chatCreator: String;
    chatParticipants: String[];
    chatPicture: String;

    constructor(chatName: String, chatCreator: String, chatParticipants: String [], chatPicture: String) {
        this.chatName = chatName;
        this.chatCreator = chatCreator;
        this.chatParticipants = chatParticipants;
        this.chatPicture = chatPicture;
        if (! this.chatPicture) {
            this.chatPicture = (this.chatParticipants.length <= 2) ? '/assets/images/profile.png'
                                                                    : '/assets/images/group-chat.png';
        }
    }
}
