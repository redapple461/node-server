import { Router } from 'express'
import Hero from '../models/schema'


const router = Router()

router.get('/getHeroes', async (req: any, res: any) => {
    Hero.find({}, (err: Error, data: object) => {
        res.send(data)
    })
})

router.post('/addHero', async (req: any, res: any) => {
    if(req.body.name === undefined ) return res.status(400).send({error: 'name is undefined'})
    console.log('hero to post: ' + req.body.name + ', '+req.body.universe);
    Hero.countDocuments({},(err: Error,c: number) => {
        console.log("Count is : "+c);
        const hero = {id: c+1, name: req.body.name, universe: req.body.universe === undefined ?  "" : req.body.universe}
        // check if hero already exists response with message
        Hero.exists({name: hero.name}, (searchErr: any, searchRes: any) => {
            // if(searchErr) console.log(err)
            if(!searchRes){
                Hero.create(hero,(_err: Error,_res: any) =>{
                    return res.status(200).send(hero)
                })
            }else{
                res.send({message: `Hero with name ${hero.name} already exists`})
            }
        })
    })
})

router.get('/getHero/:name', async (req,res) => {
    const searchName = req.params.name;
    console.log(`Get hero ${searchName}`)
    Hero.findOne({name: searchName},(err: any,data: object) => {
        // if(err) res.send(err)
        res.send(data)
    })
})


router.delete('/deleteHero/:name', async (req,res) => {
    const deleteName = req.params.name
    console.log(`Hero to delete ${deleteName}`)
    Hero.deleteOne({name: deleteName}, (err: any) => {
        // if(err) res.send(err)
        res.send({message: `Hero ${deleteName} was deleted`})
    })
})

router.put('/updateHero/:oldName', async (req,res) => {
    if(req.body.name === undefined) return res.status(400).send({error: "Name is undefined"})
    const oldName = req.params.oldName
    const name = req.body.name
    const universe = req.body.universe
    console.log(`Old name ${oldName} will update with values ${name}: ${universe}`)
    const query = { $set: {name,universe}}
    Hero.updateOne({name: oldName},query, (err: any) => {
        // if(err) return res.send(err)
        res.send({message: `Hero ${oldName} was update - ${name}: ${universe}`})
    })
})




export default router