module.exports = function({Model, ViewPath, Router, booleanKey, pluralizedViewPath}) {
    //keeps the path plural for the sake of consistency.
    const plural = pluralizedViewPath || ViewPath.toLowerCase() +'s'

    //The Routes
    //INDEX
    Router.get('/', (req, res) => {
        //finds all models within Model
        Model.find({}, (error, allModels) =>{
            //renders the pathto index
            res.render(`${plural}/Index`, {
                [plural]: allModels
            })
        })
    })

    //NEW
    Router.get('/new', (req, res) => {
        res.render(`${plural}/New`)
    })

    //DELETE
    Router.delete('/:id', (req, res) => {
        //takes the current model by id and removes it from the collection
        Model.findByIdAndRemove(req.params.id, (error, model) =>{
            res.redirect(`/${plural}`)
        })
    })

    //UPDATE

    Router.put ('/:id', (req, res) => {
        booleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //update the current document with the model
        Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true },
            (error, updatedModel) =>{
                res.redirect(`/${plural}`)
            }
        )
    })
    //CREATE

    Router.post('/', (req, res) => {
        booleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //Creates the Model for t
        Model.create(req.body, (error, createdModel) => {
            //hits up the client once created
            res.redirect(`/${plural}`)
        })
    })

    //EDIT
    Router.get('/:id/edit', (req, res) => {
        //Finds the document in the collection
        Model.findById(req.params.id, (error, foundModel) => {
            //renders the edit view and passes the found path
            res.render(`${plural}/Edit`, {
                [ViewPath] :foundModel,
            })
        })
    })

    //SHOW
    Router.get('/:id', (req, res) => {
        //Find the specific document by id
        Model.findById(req.params.id, (error, foundModel) =>{
            //render the show route and pass it the foundModel
            res.render(`${plural}/Show`, {
                [ViewPath]: foundModel,
            })
        })
    })
    return Router
}
