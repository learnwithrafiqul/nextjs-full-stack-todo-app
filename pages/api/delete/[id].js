import clientPromise from "@/db/mongodb"
import { ObjectId } from "mongodb";

export default async function deleteTodo(req, res) {
    if (req.method === 'DELETE') {
        try {
            const client = await clientPromise
            const db = await client.db("demo")
            console.log("deleteTodo", req.query.id)
            await db.collection('todo').deleteOne({ _id: new ObjectId(req.query.id) });
            res.status(200).json({ message: 'Todo deleted' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}