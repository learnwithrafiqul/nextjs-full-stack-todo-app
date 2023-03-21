import clientPromise from "@/db/mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const client = await clientPromise
        const db = await client.db("demo")
        let todos = await db.collection('todo').find({}).toArray();
        res.status(200).json(todos)

    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}