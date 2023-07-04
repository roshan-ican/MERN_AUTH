const User = require('../models/User')
const Note = require('../models/Note')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorization' })
    // ACCESS TOKEN AND REFRESH TOKEN
    const accessToken = jwt.sign(
        {
            "userInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    )
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )
    // CREATING REFRESH COOKIE WITH REFRESH TOKEN
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({accessToken})
})
const refresh = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).json({message: "Unauthorized"})
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'})
            const foundUser =await User.findOne({username: decoded.username}).exec()

            if(!foundUser) return res.status(401).json({message: 'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "userInfo":{
                        "username": foundUser.username,
                        "roles":foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            )
            res.json({accessToken})
        })
        )
}
const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(204)
    res.cookie('jwt', {
        httpOnly:true,
        secure:true,
        sameSite:'None'
    })
    res.json({message: 'Cookie Cleared'})
}

module.exports = { login, refresh, logout }