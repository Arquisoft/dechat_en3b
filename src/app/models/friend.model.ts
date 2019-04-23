export class Friend {
    name: string;
    webId: string;
    pic: string;

    constructor(friendName: string, friendWebId: string, friendPic: string) {
        this.name = friendName;
        this.webId = friendWebId;
        this.pic = friendPic ? friendPic : '/assets/images/profile.png';
        console.log(friendPic);
    }

    serialize() {
        return JSON.stringify({
            'name': this.name,
            'webId': this.webId,
            'pic': this.pic,
        });
    }

    fromJson(json) {
        const obj = JSON.parse(json);
        return new Friend(obj.name, obj.webId, obj.pic);
    }
}
