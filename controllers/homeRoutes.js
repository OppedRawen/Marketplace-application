const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
//Express
const storeItems = new Map([[1,{priceInCents:10000,name:"learn react"}],[2,{priceInCents:20000, name:" Learn CSS"}]]);
// for testing purpose
const user = [

]
router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch(err) {
        res.status(500)
    }
});
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(500)
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch(err) {
        res.status(500)
    }
});
router.post('/signup', async (req, res) => {
    try {
        const password = (req.body.password);
        user.push({
            id:Date.now().toString(),
            name: req.body.name,
            password: password
        })
        res.redirect('/login')
    } catch(err) {
        res.status(500)
        res.redirect('/register');
    }
    console.log(user);
});
router.get('/carts', async (req, res) => {
    try {
        res.render('carts');
    } catch(err) {
        res.status(500)
    }
});


// for checkout route


router.post("/create-checkout-session", async(req,res)=>{
    try {
        const session= await stripe.checkout.session.create({
            payment_method_types:['card'],
            mode: 'payment',
            line_items:req.body.items.map(item=>{
                const storeItem = storeItems.get(item.id);
                return{
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name: storeItem.name,
                        },
                        unit_amount:storeItem.priceInCents
                    },
                    quantity:item.quantity
                }
            }),
            success_url:`${process.env.SERVER_URL}/success.html`,
            cancel_utl:`${process.env.SERVER_URL}/cancel.html`
        })
        res.redirect(303,session.url);
        res.json({url:session.url});
    } catch (err) {
        console.log(err);
    }
})
module.exports = router