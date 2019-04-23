export class Friend {
    friendName: String;
    friendWebId: String;
    friendPic: String;
    chatNames: String [];

    constructor(friendName: String, friendWebId: String, friendPic: String) {
        this.friendName = friendName;
        this.friendWebId = friendWebId;
        this.friendPic = friendPic ? friendPic : '/assets/images/profile.png';
    }
}
