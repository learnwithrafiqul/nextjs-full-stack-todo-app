import clientPromise from "@/db/mongodb"
import { ObjectId } from "mongodb";

export default async function completedTodo(req, res) {
    if (req.method === 'PATCH') {
        try {
            const client = await clientPromise
            const db = await client.db("demo")
            console.log("deleteTodo", req.query.id)
            await db.collection('todo').findOneAndUpdate(
                { _id: new ObjectId(req.query.id) },
                [
                    { $set: { completed: { $not: "$completed" } } }
                ]
            )

            // updateOne({ _id: new ObjectId(req.query.id) }, {
            //     $set: {
            //         completed: !completed
            //     }
            // });
            res.status(200).json({ message: 'Todo completed' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}