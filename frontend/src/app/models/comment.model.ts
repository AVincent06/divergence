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
