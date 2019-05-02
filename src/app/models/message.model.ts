export class Message {
    id: string;
    chat: string;
    author: string;
    date: Date;
    content: string;
    millies: number;

// tslint:disable-next-line: max-line-length
    constructor(messageId: string, messageChat: string, messageAuthor: string, messageDate: string, messageContent: string, millies: string) {
        this.chat = messageChat;
        this.author = messageAuthor;
        this.date = new Date(messageDate);
        this.millies = this.date.getMilliseconds();
        this.content = messageContent;
        this.id = messageId ? messageId : messageAuthor + '_' + this.date.getTime();
    }

    static fromJson(json) {
        const obj = JSON.parse(json);
        return new Message(obj.id, obj.chat, obj.author, obj.date, obj.content, obj.millies);
    }

    serialize() {
        return JSON.stringify({
            'id': this.id,
            'chat': this.chat,
            'author': this.author,
            'date': this.date,
            'content': this.content,
            'millies': this.millies
        });
    }

    formattedDate(): string{
        return this.date.getHours() + ':' + this.date.getMinutes()
        + ', ' + this.date.getDay() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
    }

}
