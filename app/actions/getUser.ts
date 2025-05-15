"use server";
import { ddb } from "@/utils/database";
import { GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

interface User {
    id: string;
    email: string;
    name: string;
    image: string;
}

const getUser = async (id: string): Promise<User | null> => {
    try {

        const res = await ddb.send(
            new GetItemCommand({
                TableName: "Users",
                Key: {
                    id: { S: id }
                }
            })
        )

        if (!res.Item) {
            return null
        }

        const user: User = {
            id: res.Item.id.S || "",
            email: res.Item.email.S || "",
            name: res.Item.name.S || "",
            image: res.Item.image.S || ""
        }

        return user
    } catch (error) {
        console.log('Error getting user by id', error);
        return null;
    }
}

const getUserByEmail = async (email: string) => {
    try {
        const res = await ddb.send(
            new QueryCommand({
                TableName: "Users",
                IndexName: "email",
                ExpressionAttributeNames: {
                    "#email": "email"
                },
                KeyConditionExpression: "#email = :email",
                ExpressionAttributeValues: {
                    ":email": { S: email }
                }
            })
        )

        if (!res.Items || !(res.Items?.length > 0)) {
            return null
        }

        const item = res.Items[0];


        const user: User = {
            id: item.id.S || "",
            email: item.email.S || "",
            name: item.name.S || "",
            image: item.image.S || ""
        }

        return user
    } catch (error) {
        console.log('Error getting user by email', error);
        return null;
    }
}

export { getUser, getUserByEmail };