import clientPromise from "@/db/mongodb";

export default async function addTodo(req, res) {
    if (req.method === 'POST') {
        const client = await clientPromise
        const db = await client.db("demo")
        const { title } = req.body;
        console.log({ title });
        await db.collection('todo').insertOne({
            title: title,
            completed: false,
            datetime: new Date(),
        })
        res.status(200).json({ "message": "New todo added !" })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}