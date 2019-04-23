export class Chat {
    name: string;
    creator: string;
    participants: string[];
    picture: string;

    constructor(chatName: string, chatCreator: string, chatParticipants: string [], chatPicture: string) {
        this.name = chatName;
        this.creator = chatCreator;
        this.participants = chatParticipants;
        this.picture = chatPicture;
        if (! this.picture) {
            this.picture = (this.participants.length <= 2) ? '/assets/images/profile.png'
                                                            : '/assets/images/group-chat.png';
        }
    }

    serialize() {
        return JSON.stringify({
            'name': this.name,
            'creator': this.creator,
            'participants': this.participants,
            'picture': this.picture
        });
    }

    fromJson(json) {
        const obj = JSON.parse(json);
        return new Chat(obj.name, obj.creator, obj.participants, obj.picture);
    }
}
