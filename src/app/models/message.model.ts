export class Message {
    id: string;
    chat: string;
    author: string;
    date: Date;
    content: string;

    constructor(messageId: string, messageChat: string, messageAuthor: string, messageDate: string, messageContent: string) {
        this.chat = messageChat;
        this.author = messageAuthor;
        this.date = messageDate ? new Date(messageDate) : new Date();
        this.content = messageContent;
        this.id = messageId ? messageId : messageAuthor + '_' + this.date.getTime();
    }

    static fromJson(json) {
        const obj = JSON.parse(json);
        return new Message(obj.id, obj.chat, obj.author, obj.date, obj.content);
    }

    serialize() {
        return JSON.stringify({
            'id': this.id,
            'chat': this.chat,
            'author': this.author,
            'date': this.date,
            'content': this.content
        });
    }

    formattedDate(): string{
        return this.date.getHours() + ':' + this.date.getMinutes()
        + ', ' + this.date.getDay() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
    }

}
