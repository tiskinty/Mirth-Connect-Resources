// Very Basic Testing Parameters
var msgidStart = "21";
var msgidStop = "21";
var replaceMsg = true;

var reprocessMetaCollection = new java.util.ArrayList();
reprocessMetaCollection.add(java.lang.Integer("0"));
reprocessMetaCollection.add(java.lang.Integer("1"));


// Minimalist Filter 
var simpleFilter = new com.mirth.connect.model.filters.MessageFilter();
simpleFilter.setMaxMessageId(java.lang.Long(msgidStop));
simpleFilter.setMinMessageId(java.lang.Long(msgidStart));

// Reprocess Messages (any channel by channelId) 
function reprocessMessages(channeLId, filter, replace, metadataIds) {
        metadataIds = metadataIds || null; //Optional
        var messageController = com.mirth.connect.server.controllers.MessageController.getInstance();
        try {
                        var executor = java.util.concurrent.Executors.newFixedThreadPool(1);
                        var task = new java.util.concurrent.Callable({
                                call: function () {
                                        messageController.reprocessMessages(
                                                channeLId, //String channelId, 
                                                filter, //MessageFilter filter, //cannot be null
                                                replace, //boolean replace, 
                                                metadataIds //Collection<Integer> reprocessMetaDataIds
                                        );
                                        return "complete";
                                }
                        });
                        var future = executor.submit(task);
                        executor.shutdown();
                
        } catch (e) {
                logger.error(e)
        }
}

reprocessMessages(channelId, simpleFilter, replaceMsg, null);
