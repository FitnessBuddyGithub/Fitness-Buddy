const router = require('express').Router()
const User = require('../db/models/user')
const { Op } = require('sequelize')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})


router.put('/:userId/location', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    const updated = await User.findAll({where:{id: req.params.userId}})
    res.json(updated[0])
  } catch (err) {
    next(err)
    }
  }
)

router.get('/:userId/nearby', async (req, res, next)=> {
  try{
    const user = await User.findByPk(req.params.userId)
    const users = await User.findAll({
      where:{
        location: {
          $near: {
            $geometry: {
                type: `Point`,
                coordinates: [ user.location.coordinates[0], user.location.coordinates[1] ]
            },
            $maxDistance: 500,
            $minDistance: 0
        }
        },
        updatedAt:{
          [Op.gte]: moment().subtract(1, 'days').toDate()
        }
      }
    })
  }
  catch(err){
    next(err)
  }
}
)

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

