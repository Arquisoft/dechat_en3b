export class Model {
    messageId: String;
    messageChat: String;
    messageAuthor: String;
    messageDate: Date;
    messageContent: String;

    constructor(messageId: String, messageChat: String, messageAuthor: String, messageDate: Date, messageContent: String) {
        this.messageId = messageId;
        this.messageChat = messageChat;
        this.messageAuthor = messageAuthor;
        this.messageDate = messageDate;
        this.messageContent = messageContent;
    }
}
