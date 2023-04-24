const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire state of building',
        description: 'One of teh most famous sky scrapers in the world!',
        location: {
            lat: 40.748817,
            lng: -73.985428
        },
        address: '20 W 34th St., New York, NY 10001',
        creator: 'u1'
    }
];

// router.get('/', (req, res, next) => {
//     console.log('Get request in places');
//     res.json({message: 'It works find. '})
// })

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid; // {pid: 'pi'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    
    res.json({place}); // => { place } => { place: place }
    
    
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided user id.', 404));
    }
    res.json({ place });
});

module.exports = router;