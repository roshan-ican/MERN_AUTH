const User = require('../models/User')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signUp = asyncHandler(async (req, res) => {
    const {
        fullName,
        emailAddress,
        password,
        confirmPassword,
        dateOfBirth,
        phoneNumber,
        address,
        city,
        state,
        securityQuestion,
        securityAnswer,
        zipCode,
        country,
    } = req.body;

    // Validate required fields
    if (!emailAddress || !password || !confirmPassword || !fullName ||  !dateOfBirth || !phoneNumber || !address || !city || !state || !securityQuestion || !securityAnswer || !zipCode || !country) {
        return res.status(400).json({ message: 'All the fields are required' });
    }

    // Duplicate check
    const duplicateemailAddress = await User.findOne({ emailAddress }).lean().exec();
    if (duplicateemailAddress) {
        return res.status(409).json({ message: `User with emailAddress ${emailAddress} already exists` });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // Salt rounds

    // Create and store user
    const userObject = {
        fullName,
        emailAddress,
        password: hashedPwd,
        dateOfBirth,
        phoneNumber,
        address,
        city,
        state,
        securityQuestion,
        securityAnswer,
        zipCode,
        country,
    };

    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New user ${emailAddress} created successfully` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

const login = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body
    if (!emailAddress || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ emailAddress }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorization' })
    // ACCESS TOKEN AND REFRESH TOKEN
    const accessToken = jwt.sign(
        {
            "userInfo": {
                "emailAddress": foundUser.emailAddress,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
    )

    res.json({accessToken, ...foundUser._doc})
})
const refresh = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).json({message: "Unauthorized"})
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'})
            const foundUser =await User.findOne({emailAddress: decoded.emailAddress}).exec()

            if(!foundUser) return res.status(401).json({message: 'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "userInfo":{
                        "emailAddress": foundUser.emailAddress,
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

module.exports = { login, refresh, logout,signUp }