const mongo = require('mongodb').MongoClient;
class database {
    constructor(url, dbname){
        this.url = url;
        this.collection = null;
        this.mongo = null;
        this.db = null
        this.dbname = dbname;

    }
    connect(){
        return new Promise((res, rej) => {
            mongo.connect(this.url , {useNewUrlParser : true}).then((client) =>{
                this.mongo = client;
                this.db = client.db(this.dbname)
                res(this)
            });
        })
    }
    setCollection(collection){
        this.collection = collection;
    }
    update(key, match, replacement){
        this.db.collection(this.collection).updateOne({[key]: match}, {$set: {...replacement}})
    }
    insert(data){
        console.log(data);
        this.db.collection(this.collection).insertOne(data, (err) => {
            console.log(err)
        })
    }
    insertMany(data){
        this.db.collection(this.collection).insertMany(data, (err) => {
            console.log(err)
        })
    }
    async findDocument(key, name){
        return await this.db.collection(this.collection).findOne({});
    }
    async findAll(){
        return await this.db.collection(this.collection).find({}).toArray();
    }
}
module.exports = database;

