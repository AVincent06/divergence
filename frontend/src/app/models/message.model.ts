/**
* @file Model for structuring the data to be displayed on the frontend for messages.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
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
