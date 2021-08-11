export interface Message_news {
    id: number;
    picture?: string;
    article?: string;
    createdAt: Date;
    updatedAt: Date;

    userId: number;
    firstname: string;
    name: string;
    photo: string;

    nbComments: number;
    
    usersLiked: number[];
    usersDisliked: number[];
    likes: number;
    dislikes: number;
}

export interface Message_post {
    file?: File;
    article?: string;
    user_id: number;
}
