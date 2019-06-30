import { Message } from "./message.model";

export class Chat {
    name: string;
    creator: string;
    participants: string[];
    picture: string;
    id: string;
    messages: Message[];
    selected = false;
    visible = true;

    constructor(chatName: string, chatCreator: string, chatParticipants: string [], chatPicture: string, id: string) {
        this.name = chatName;
        this.creator = chatCreator;
        this.participants = chatParticipants;
        this.picture = chatPicture;
        if (! this.picture) {
            this.picture = (this.participants.length <= 2) ? 'assets/images/profile.png'
                                                            : 'assets/images/group-chat.png';
        }
        this.id = id ? id : this.name.split(' ').join('_') + '_' + new Date().getTime();
    }

    static fromJson(json) {
        const obj = JSON.parse(json);
        return new Chat(obj.name, obj.creator, obj.participants, obj.picture, obj.id);
    }

    serialize() {
        return JSON.stringify({
            'name': this.name,
            'creator': this.creator,
            'participants': this.participants,
            'picture': this.picture,
            'id': this.id
        });
    }
}
