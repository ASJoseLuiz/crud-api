const pool = require('./pool')


const getUsers = async (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC;', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        pool.query('SELECT * FROM users WHERE id = $1;', [id], (err, result) => {
            if (err) {
                throw err
            }
            if (result.rows == 0) {
                return res.status(500).json({ message: 'Usuário não encontrado' })
            }
            
            res.status(200).json(result.rows)
        })
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuário por ID" })
    }
}

const createUser = async (req, res) => {
    const { name, email } = req.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;',
        [name, email], (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).send(`User added with ID: ${result.rows[0].id}`)
        }
    )
}

const updateUser = async (req, res) => {
    const id = req.params['id']
    const { name, email } = req.body

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3;', 
        [name, email, id], (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id) 
    
    pool.query('DELETE FROM users WHERE id = $1;', [id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`User deleted with id: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

