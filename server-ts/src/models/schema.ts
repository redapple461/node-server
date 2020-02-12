import mongo from 'mongoose'
import config from 'config'


const Schema = mongo.Schema
const {host,port,name} = config.get('mongoDB')
const connectUrl = `mongodb://${host}:${port}/${name}`
const hero = new Schema({
    id: {type: Number},
    name: {type: String, unique: true},
    universe: {type: String}
})

const db = mongo.connect(connectUrl, (err: Error, res: any) => {
    console.log('Connect to '+db,' + ',res)
})

export default mongo.model('heroes',hero,'heroes')