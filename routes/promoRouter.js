const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promos = require('../models/promo');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next)=>{
Promos.find({})
.then((promo)=>{
    res.status=200;
    res.setHeader('Content-Type','application/json')
    res.json(promo);
},(err)=> next(err)
)
.catch((err)=>next(err));
})
.post((req,res,next)=>{
    Promos.create(req.body)
    .then((promo)=>{
        console.log('promo Document Created',promo);
        res.status=200;
    res.setHeader('Content-Type','application/json')
    res.json(promo);
    },(err) =>next(err) )
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.status=403;
    res.end('Put operation not apply on promo/')
;
})
.delete((req,res,next)=>{
    Promos.remove({})
    .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));    
    });
    
    promoRouter.route('/:promoId')
    .get((req,res,next)=>{
        Promos.findById(req.params.promoId)
        .then((promo)=>{
            res.status=200;
            res.setHeader('Comtent-type','application/json');
            res.json(promo);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post((req,res,next)=>{
        res.send('Post operation not applied on promoId');
    }
    )
    .put((req,res,next)=>{
        Promos.findByIdAndUpdate(req.params.promoId,{
            $set:req.body
             },
        { new:true }
        )
        .then((promo)=>{
            res.status=200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);

        },(err)=>next(err))
        .catch((err)=>next(err));

     })
     .delete((req,res,next)=>
     {
         Promos.findByIdAndRemove(req,params.promoId)
         .then((response)=>{
             res.status=200;
             res.setHeader('Content-Type','application/json');
            res.json(response) ;

         },(err)=>next(err))
         .catch((err)=>next(err));

     });
     module.exports = promoRouter;