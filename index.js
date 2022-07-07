const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(express.urlencoded());

app.use(cookieParser());

// static files in project
app.use(express.static('./assets'));
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/js', express.static(__dirname + 'assets/js'))
app.use('/scss', express.static(__dirname + 'assets/scss'))
app.use('/images', express.static(__dirname + 'assets/images'))

app.use('/uploads', express.static(__dirname + '/uploads'));



app.use(expressLayouts);

//removing layout.ejs from user signin and signup page.


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//-------------------------- starting of socket io part---------------------------------------------------------------------------- 
const server = require('http').createServer(app)
const io = require('socket.io')(server)


var users=[];
var idsnicks={};
io.on('connection', function (socket) {
    console.log('a user connected');

  socket.on('login', function  (nick) {
    users.push(nick);
    socket.nick=nick;
    idsnicks[nick]=socket.id;
    io.emit('userlist', users);
  })

  socket.on('send', function  (data) {
    if (io.sockets.connected[idsnicks[data.usr]]!==undefined) {
    io.sockets.connected[idsnicks[data.usr]].emit('sendmsg', {msg:data.msg, usr:socket.nick});
   }
  })

  socket.on('startchat', function  (data) {
  if (io.sockets.connected[idsnicks[data]]!==undefined) {
    io.sockets.connected[idsnicks[data]].emit('openchat', socket.nick);
  }
  })

  socket.on('disconnect', function () {
      console.log('disc');
     users.splice( users.indexOf(socket.nick), 1 );
     delete idsnicks[socket.nick];
    io.emit('discon', {usr:socket.nick, list:users});


      });

  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});


//----------------------------------------ending of socket io part-------------------------------------------------------------





// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);



// --------------------------------------implementing article start--------------------------------------------------- 

const Article = require('./models/article')
const articleRouter = require('./route/articles')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.get('/lol', async (req,res)=> {
  const articles = await Article.find().sort({createdAt : 'desc'})
  res.render('articles/index', {articles:articles})
})
app.use('/articles',articleRouter)




// --------------------------------------implementing article end--------------------------------------------------- 


app.use('/', require('./routes'));
