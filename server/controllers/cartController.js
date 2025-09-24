export function createCartController(db){
    return {
        list : async (req, res) => {
            try {
                const result = await db.query("SELECT * FROM cart ORDER BY id DESC;");
                return res.json(result.rows ?? result);   
            } catch (err) {
                console.error("Error in cartController.list:", err);
                return res.status(500).json({ error: "Failed to fetch cart items" });         
            }
        },
        create : async (req, res) => {
            try {
                const {name, category} = req.body || {}
                if(!name || !category){
                    return res.status(400).json({ error: "name and category are required" });
                }
                const insert = await db.query(
                    "INSERT INTO cart (name, category) VALUES ($1, $2) RETURNING *",
                    [name, category]
                );
                return res.status(201).json(insert.rows?.[0] ?? insert);
            } catch (err) {
                console.error("Error in cartController.create:", err);
                return res.status(500).json({ error: "Failed to create cart item" });  
            }
        },
        delete : async (req, res) => {
            try {
                const id = Number(req.params.id)
                if(!Number.isInteger(id) || id <= 0){
                    return res.status(400).json({error: "Invalid id parameter"})
                }

                 const deleted = await db.query(
                    "DELETE FROM cart WHERE id = $1 RETURNING *",
                    [id]
                );
                if(!deleted.rows || deleted.rows.length === 0){
                    return res.status(404).json({error : "cart item not found"})
                }
                return res.status(200).json(deleted.rows[0])
            } catch (err) {
                console.error("Error in cartController.delete", err)
                return res.status(500).json({error : "failed to delete cart item"})   
            }
        }
    }
}