import express from 'express'
import pool from '../models/db.js'
const router = express.Router()


router.get('/', async(req,res)=>{
    try{
        const result = await pool.query(`SELECT * FROM novelData`)
        res.json({data: result.rows})
    }
    catch(err){
        console.error(`Error occured ` + err)
        res.status(500).send('Internal Error')
    }
})

router.get('/:id', async(req,res) =>{
    const {id} = req.params
    const values = [id]
    const query = `SELECT title,content,author FROM noveldata WHERE id = $1`
    try {
        const result = await pool.query(query,values)
        res.json({data: result.rows})
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Error")
    }
})

router.post('/', async(req,res)=>{
    const {title, content, author} = req.body
    const query = `INSERT INTO noveldata(title,content,author) VALUES ($1,$2,$3)`
    const value = [title, content, author]
    try{
        const data = await pool.query(query,value)
        res.json({message: 'Successfully Inserted'})
    }catch(err){
        console.error(`Error occured ` + err)
        res.status(500).send('Internal error Occured')
    }
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params
    const {title,content,author} = req.body
    const values = [title, content,author, id]
    const query = `UPDATE noveldata SET title=$1, content=$2, author=$3 WHERE id = $4`

    try {
        const result = await pool.query(query,values)

        if(result.rowCount > 0){
            res.json({message: 'Successfully Updated'})
        }
        else{
            res.status(404).json({ message: 'Record not found' });
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Error")
    }

})

router.delete('/:id',async(req,res)=>{
    const {id} = req.params
    const value = [id]
    const query = `DELETE FROM noveldata WHERE id = $1`
    try {
        const result = await pool.query(query,value)
        res.json({message:"Delete Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }

})

export default router