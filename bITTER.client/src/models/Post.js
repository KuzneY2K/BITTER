export class Post{
    constructor(data){
        this.contents = data.contents
        this.mediaUrl = data.mediaUrl
        this.authorId = data.authorId
        this.authorName = data.authorName
        this.authorPicture = data.authorPicture
        this.postId = data._id
    }
}