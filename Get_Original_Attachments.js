// Author: Nick Rupley
// Resolving the issue of recovering attachments for reprocessing messages in Mirth Connect Versions <= 3.12
// Workaround until this is done better in Mirth Connect
function getOriginalAttachments(base64Decode) {
	if ($('reprocessed') == true) {
		var filter = com.mirth.connect.model.filters.MessageFilter();
		filter.setMinMessageId(connectorMessage.getMessageId());
		filter.setMaxMessageId(connectorMessage.getMessageId());
		var messages = com.mirth.connect.server.controllers.ControllerFactory.getFactory().createMessageController().getMessages(filter, channelId, false, 0, 1);
		if (messages.size() > 0) {
			var originalId = messages.get(0).getOriginalId();
			if (originalId) {
				return AttachmentUtil.getMessageAttachments(channelId, originalId, base64Decode || false);
			}
		}
	}

	// Empty list
	return Lists.list();
}
