const express = require('express')
const mongoose = require('mongoose')
const { verifyLogin, getBalance } = require('../../lib/nft')
const { resizeAvatarImage, resizeBackgroundImage } = require('../../lib/files')
const ethers = require('ethers')
const EventSchema = require("../../mongodb/schema/Event")
const  ReservationSchema = require('../../mongodb/schema/Reservation')

const router = express.Router()

const Event = mongoose.model('Event', EventSchema);
const Reservation = mongoose.model('Reservation', ReservationSchema)


const { v4: uuidv4 } = require('uuid')

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find()

    return res.status(200).send({ msg: 'Events retrieved successfully', events })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { eventName,
        description,
        date, 
        permissions,
        reservations,
        requirement,  } = req.body

    // const address = await verifyLogin(token)
    let eventId = uuidv4() + makeid(4);

    let event = new Event({
        eventId, 
        eventName,
        description,
        date, 
        permissions,
        requirement:[requirement],
    })

    event.save()
    return res.status(200).send({ msg: 'Successfully created event', event })
  } catch (err) {
    next(err)
  }
})


router.post('/delete', async (req, res, next) => {
    try {
      const token = req.headers['authorization']
      const { eventId, _id } = req.body
  
      // const address = await verifyLogin(token)
  
      let event = await Event.findOne({eventId:eventId}).remove().exec()
  

      return res.status(200).send({ msg: 'Successfully delete event', event })
    } catch (err) {
      next(err)
    }
  })



router.post('/reserve', async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const { eventId, user, _id} = req.body

        // const address = await verifyLogin(token)
        let reserveId = uuidv4();
        let event = await Event.findOne({eventId, _id})
        let findUserRSVP = event.reservations.find((val)=>{
            if(val.reservedBy.address === user.address){
                return true;
            }
        });
        let reserve = new Reservation({
            eventId, 
            reserveId,
            reservedBy:user
        })

        console.log(eventId, _id, event)

        if(findUserRSVP) return res.status(400).send({msg:'Address already reserved', err:true});

        event.reservations.push({reserveId, reservedBy:user, date: new Date()})

        reserve.save(); 
        return res.status(200).send({ msg: 'Successfully reserve event', event })
    } catch (err) {
        next(err)
    }
})

module.exports = router
