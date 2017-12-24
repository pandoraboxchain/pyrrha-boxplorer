import { Map } from 'immutable';

function appendNewFields(json, newJson) {
    for(var key in json) {
        json[key].push(...newJson[key]);
    }
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
