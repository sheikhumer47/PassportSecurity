const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res,next)=>{
Leaders.find({})
.then((leader)=>{
    res.status=200;
    res.setHeader('Content-Type','application/json')
    res.json(leader);
},(err)=> next(err)
)
.catch((err)=>next(err));
})
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('leader Document Created',leader);
        res.status=200;
    res.setHeader('Content-Type','application/json')
    res.json(leader);
    },(err) =>next(err) )
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.status=403;
    res.end('Put operation not apply on leader/')
;
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));    
    });
    
    leaderRouter.route('/:leaderId')
    .get((req,res,next)=>{
        Leaders.findById(req.params.leaderId)
        .then((leader)=>{
            res.status=200;
            res.setHeader('Comtent-type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post((req,res,next)=>{
        res.send('Post operation not applied on leaderId');
    }
    )
    .put((req,res,next)=>{
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set:req.body
             },
        { new:true }
        )
        .then((leader)=>{
            res.status=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);

        },(err)=>next(err))
        .catch((err)=>next(err));

     })
     .delete((req,res,next)=>
     {
         Leaders.findByIdAndRemove(req,params.leaderId)
         .then((response)=>{
             res.status=200;
             res.setHeader('Content-Type','application/json');
            res.json(response) ;

         },(err)=>next(err))
         .catch((err)=>next(err));

     });
     module.exports = leaderRouter;