var express = require('express');
var kafka = require('kafka-node');
var app = express();
var bodyParser = require('body-parser');
var event = require("events");
const cors = require('cors');
var nrc = require('node-run-cmd');



app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);
    
producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})

app.get('/',function(req,res){
    res.json({greeting:'Kafka Producer'})
});

app.listen(5001,function(){
    console.log('Kafka producer running at 5001')
})


app.post('/send',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: req.body.topic, messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
            res.json(data);
    });
    //console.log(req.body.topic);
    
})




global.kontrol = false;

app.post('/changetopic',function(req,res){
    //var topic = JSON.stringify(req.body.topic);
    // payloads = [
    //     { topic: req.body.topic}
    // ];

    //consumer.payloads[0].topic
    consumer.addTopics([req.body.topic], function (err, added) {
        console.log(added+" eklendi.");
    });

    //console.log(req.body.topic);
    //consumer.pause();
    //consumer.pause();
    //consumer.payloads[0].topic=req.body.topic;
    //global.dataarray = [];
    consumer.resume();
    console.log(consumer.payloads[0]);
    global.kontrol = true;
    //console.log("burada");
});

const eventEmitter2 = new event.EventEmitter();
eventEmitter2.setMaxListeners(150);

app.post('/createtopic',function(req,res){
    var kafka = require('kafka-node');
    var client = new kafka.KafkaClient();
    
    console.log(req.body.createtopic);
    var topicsToCreate = [{
    topic: req.body.createtopic,
    partitions: 1,
    replicationFactor: 1
    }
    ];
    client.createTopics(topicsToCreate, (error, result) => {
        
    });
    
});


app.get('/deletetopic',function(req,res) {

// var commands = [
//     'kafka-topics.bat --delete --zookeeper localhost:2181 --topic topic2'
// ];

// var options = { cwd: '/kafka_2.11-2.3.0/bin/windows' };


// nrc.run(commands, options);

});

const eventEmitter3 = new event.EventEmitter();
eventEmitter3.setMaxListeners(150);

global.listtopic = [];

app.get('/listtopics',function(req,res) {

    const client = new kafka.KafkaClient();
    const admin = new kafka.Admin(client);
    global.res1=res;
    
    global.data1;
    admin.listTopics((err, res) => {
    eleman=res[1].metadata;
    var newarray=[eleman];
    //var topiclist=[];
    var topiclist=[];
    Object.keys(newarray[0]).filter(function(key) {
        topiclist.push(key);
      }).join(" "); 

      //console.log(topiclist);
      global.res1.json(topiclist);
      global.listtopic=topiclist;
      eventEmitter3.emit("trigsend");
    }); 
    

});


const http = require('http')
const socketIO = require('socket.io')
const port = 4001
const server = http.createServer(app)
const io = socketIO(server)
const eventEmitter = new event.EventEmitter();
eventEmitter.setMaxListeners(150);






var kafka = require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer(client,
[{ topic: 'emptytopic', offset: 0}],
{
    groupId: 'kaanbayram',
    autoCommit: false
});
    
global.dataarray = [];



// consumer.removeTopics(['topic1', 'topic2','topic3'], function (err, removed) {
//     console.log('silimdi '+removed);
// });

consumer.on('message', function (message) {
    if (global.kontrol===true) {
        count=global.dataarray.length;
        while(count > 0) {
            global.dataarray.pop();
            count=count-1;
        }
        global.kontrol=false;
    }
    
    console.log(message.value);
    dataarray.push(message.value);
    eventEmitter.emit("trigger");
});

io.on('connection', socket => {
    console.log('User connected');
    io.sockets.emit('getmessage', {data: dataarray});

    eventEmitter.on("trigger", () => {
    io.sockets.emit('getmessage', {data: dataarray})
    });

    
});

io.on('connection', socket => {
    console.log('user connected socket2');
    io.sockets.emit('sendlist',{data: listtopic});

    eventEmitter3.on("trigsend", () => {
        io.sockets.emit('sendlist',{data: listtopic})
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));



//console.log(consumer);


// eventEmitter_2.on("trigger_2", () => {
//     console.log("trigger2_fonk");
//     console.log(consumer.payloads[0].topic);

//     consumer.resume();
//     consumer.addTopics(['newtopic'], function (err, added) {
//         console.log(added);
//     });
// });


// socket.on('data', (data) => { 
//     eventEmitter_2.emit("trigger_2");
// })


