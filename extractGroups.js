/*
Consumes the JSON response from the Mirth API at /api/channelgroups/_getChannelGroups and returns a flatter json object like
{
  "channelGroup[0].id":
    ["channels.channel[0].id","channels.channel[1].id"]
}

ie - 
{
  "ada6896f-ef9a-4ba0-bba6-c59963ee7676":
    ["3df9188c-5c75-4b09-9de7-cf9a64d32eb0","f8b7a431-45fa-4e65-a622-8899cd50fe46","2db9b9e5-1aef-4d98-8973-29d3136e70b1","19e06efc-08b2-4892-b51f-aebf771126bd"],
  "2449743a-9df5-44d7-b9ae-f663d2fcdb3f":
    ["771477d2-a06f-4462-b20a-835c10b99502","9dea7f00-89ec-442c-b40c-6b6ad2c09ae7","f16f7887-58ff-4e5f-9f39-892b19d6b093"],
  "cdfc34c3-2951-4b5a-a93c-f4e0e4108de9":
    ["251ddcc8-679f-457b-bca8-669ba09f30c1","b1601c3d-da20-4fe1-b003-6eccb108af89","82cf388b-f127-400c-8d28-5fd2dffb72c2","7e4aa083-f036-4c8b-9404-ac3978b58db6"]
}
*/

function extractIds(jsonObject) {
  const channelGroups = jsonObject.list.channelGroup;
  const result = {};

  channelGroups.forEach((group) => {
    const channelGroupId = group.id;
    const channelIds = group.channels.channel.map((channel) => channel.id);

    result[channelGroupId] = channelIds;
  });

  return result;
}

/*
Consumes the JSON response from the Mirth API at /api/channelgroups/_getChannelGroups and returns a flatter map-style json object like
{
  "channels.channel[0].id": "channelGroup[0].id",
  "channels.channel[1].id": "channelGroup[0].id",
  "channels.channel[2].id": "channelGroup[0].id"
}

ie - 
{
  "3df9188c-5c75-4b09-9de7-cf9a64d32eb0":"ada6896f-ef9a-4ba0-bba6-c59963ee7676",
  "f8b7a431-45fa-4e65-a622-8899cd50fe46":"ada6896f-ef9a-4ba0-bba6-c59963ee7676",
  "2db9b9e5-1aef-4d98-8973-29d3136e70b1":"ada6896f-ef9a-4ba0-bba6-c59963ee7676",
  "19e06efc-08b2-4892-b51f-aebf771126bd":"ada6896f-ef9a-4ba0-bba6-c59963ee7676",
  "771477d2-a06f-4462-b20a-835c10b99502":"2449743a-9df5-44d7-b9ae-f663d2fcdb3f",
  "9dea7f00-89ec-442c-b40c-6b6ad2c09ae7":"2449743a-9df5-44d7-b9ae-f663d2fcdb3f",
  "f16f7887-58ff-4e5f-9f39-892b19d6b093":"2449743a-9df5-44d7-b9ae-f663d2fcdb3f",
  "251ddcc8-679f-457b-bca8-669ba09f30c1":"cdfc34c3-2951-4b5a-a93c-f4e0e4108de9",
  "b1601c3d-da20-4fe1-b003-6eccb108af89":"cdfc34c3-2951-4b5a-a93c-f4e0e4108de9",
  "82cf388b-f127-400c-8d28-5fd2dffb72c2":"cdfc34c3-2951-4b5a-a93c-f4e0e4108de9",
  "7e4aa083-f036-4c8b-9404-ac3978b58db6":"cdfc34c3-2951-4b5a-a93c-f4e0e4108de9"
}
*/

function extractIdsMap(jsonObject) {
  const channelGroups = jsonObject.list.channelGroup;
  const result = {};

  channelGroups.forEach((group) => {
    const channelGroupId = group.id;
    const channelIds = group.channels.channel.map((channel) => channel.id);

    channelIds.forEach((channelId) => {
      result[channelId] = channelGroupId;
    });
  });

  return result;
}
  
  
