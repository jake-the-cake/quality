import express, { Request } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {

  const rawHtml = Buffer.from(fs.readFileSync(path.join(__dirname, '..', 'public','index.html'))).toString('utf-8')

  const html = insertMetaData(rawHtml, {})

  res.send(html)
})

app.listen(5000, messageLog('connected'))

function insertMetaData(html: string, data: any): string {
  return html
}

function messageLog(message: string): () => void { return () => console.log(message)}
function messageWarn(message: string): () => void { return () => console.log(message)}
function msgError(message: string): () => void { return () => console.log(message)}