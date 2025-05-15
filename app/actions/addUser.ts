"use server";
import { ddb } from "@/utils/database";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export interface User {
    id?: string;
    email: string;
    name: string;
    image: string;
}

const addUser = async (user: User) => {
    try {
        user.id = crypto.randomUUID();

        await ddb.send(
            new PutItemCommand({
                TableName: "Users",
                Item: {
                    id: { S: user.id },
                    email: { S: user.email },
                    name: { S: user.name },
                    image: { S: user.image },
                    createdAt: { S: new Date().toISOString() },
                }
            })
        )
    } catch (error) {
        console.log('Error adding user', error);
    }
}

export { addUser };