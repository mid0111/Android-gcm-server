
/*
 * GET home page.
 */
var googleApiKey = require('../config').googleApiKey;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.post = function(req, res) {

  var registrationId = req.body.registrationId;
  console.log(registrationId);

  // GCM settings
  var gcm = require('node-gcm');

  // create a message
  var message = new gcm.Message({
    collapseKey: 'android-gcm-demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
      text: 'これはてすとです。'
    }
  });

  var sender = new gcm.Sender(googleApiKey);
  var registrationIds = [registrationId];

  message.collapseKey = 'demo';
  message.delayWhileIdle = true;
  message.timeToLive = 3;
  message.dryRun = false;

  /**
   * Params: message-literal, registrationIds-array, No. of retries, callback-function
   **/
  sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
    res.send(200, result);
  });

};
