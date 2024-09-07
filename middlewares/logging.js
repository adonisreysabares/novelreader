import express from 'express'

const dataLogging = ((req,res,next) =>{
    console.log(`${req.method} ${req.hostname}`)
    next()
})

export default dataLogging