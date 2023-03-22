// Get a reference to the Mirth Connect server
var server = Packages.com.mirth.connect.server.controllers.ControllerFactory.getFactory().createController();

// Get all channels
var channels = server.getChannelList();

// Create an empty array to store the errored messages
var erroredMessages = [];

// Loop through each channel
for (var i = 0; i < channels.size(); i++) {
  var channel = channels.get(i);
  
  // Get the statistics for the channel
  var statistics = server.getChannelStatistics(channel.getId());
  
  // Get the number of errors for the channel
  var errorCount = statistics.getErrors();
  
  // If there are errors, get the messages
  if (errorCount > 0) {
    var messages = server.getMessagesByErrorStatus(channel.getId(), 'ERROR', 0, errorCount);
    
    // Add the messages to the erroredMessages array
    while (messages.hasNext()) {
      erroredMessages.push(messages.next());
    }
  }
}

// Do something with the errored messages
// For example, log them to the Mirth Connect log
if (erroredMessages.length > 0) {
  for (var i = 0; i < erroredMessages.length; i++) {
    var message = erroredMessages[i];
    logger.error("Errored message found in channel " + message.getChannelName() + " with ID " + message.getMessageId());
  }
}
