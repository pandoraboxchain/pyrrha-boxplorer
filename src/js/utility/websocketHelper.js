import { Map } from 'immutable';

function appendNewFields(json, newJson) {
    for(var key in json) {
        mergeEntries(json[key], newJson[key]);
    }
}

function mergeEntries(list, newList)
{
    var changedEntries = [];
    var createdEntries = [];
    for (let i = 0; i < newList.length; i++) {
        var entry = newList[i]
        if ("type" in entry) {
            if (entry["type"] == "changed") {
                changedEntries.push(entry);
                continue;
            }
        }
        createdEntries.push(entry);
    }

    for (let i = 0; i < changedEntries.length; i++) {
        let entry = changedEntries[i];
        //TODO: replace with "address" for consistency when ready on backend
        var changedEntryIndex = findEntryWithField(list, "jobAddress", entry["jobAddress"]);
        if (changedEntryIndex != -1)
        {
            list[changedEntryIndex] = entry;
        }
    }

    list.push(...createdEntries);
}

function findEntryWithField(list, key, value)
{
    for (var i = 0; i < list.length; i++)
    {
        var entry = list[i];
        if (key in entry) {
            if (entry[key] == value) {
                return i;
            }
        }
    }
    return -1;
}

function getRawRequest(container) {
    if (container && container.example && container.example.result) {
        var rawRequest = container.example.result.get("requestRaw");
        return rawRequest;
    }
    return null;
}

export function createStateDataFromProps(props) {
    var stateJson = {};
    var propsJson = getRawRequest(props).toJS();

    for(var key in propsJson) {
        stateJson[key] = propsJson[key];
    }

    var map = Map({ requestRaw: stateJson });
    return {example: {result: map } };
}

export function appendDataFromWebsocket(actualData, websocketData)
{
    var stateJson = getRawRequest(actualData);
    appendNewFields(stateJson, JSON.parse(websocketData));
    return actualData;
}
