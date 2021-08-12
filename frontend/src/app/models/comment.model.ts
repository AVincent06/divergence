/**
* @file Model for structuring the data to be displayed on the frontend for comments.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
export interface Comment_get {
    id: number;
    feedback: string;
    createdAt: Date;
    updatedAt: Date;

    messageId: number;

    UserId: number;
    firstname: string;
    name: string;
    photo: string;
}
