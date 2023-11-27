import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

app.listen(5000, callbackLog('connected'))

function callbackLog(message: string): () => void {
  return () => console.log(message)
}