import * as Actions from "./constants";
const clearMock = () => [];
const Propertiesopen = () => [];
const Openclosedemo = () => [];
const outputjson = () => [];
const workspacejson=()=>[];
const removeConnection = (state, connection) => {
  const inputNodeIndex = state.nodes.findIndex(
    (n) => n.id === connection.input.nodeId
  );
  const inputConnections =
    state.nodes[inputNodeIndex].inputs[connection.input.port].connection;
  const inputConnectionIndex = inputConnections.findIndex(
    (s) =>
      s.nodeId === connection.output.nodeId && s.port === connection.output.port
  );
  inputConnections.splice(inputConnectionIndex, 1);
  const outputNodeIndex = state.nodes.findIndex(
    (n) => n.id === connection.output.nodeId
  );
  const outputConnections =
    state.nodes[outputNodeIndex].outputs[connection.output.port].connection;
  const outputConnectionIndex = outputConnections.findIndex(
    (s) =>
      s.nodeId === connection.input.nodeId && s.port === connection.input.port
  );
  outputConnections.splice(outputConnectionIndex, 1);
};
export const reducer = (
  state = {
    nodes: clearMock(),
    popup: Propertiesopen(),
    openclose1: Openclosedemo(),
    output: outputjson(),
    workspace:workspacejson()
  },
  action
) => {
  if (action.type === Actions.EDITOR_UPDATES) {
    const payload = action.payload;

    // const classNames = Math.random() > 0.7 ? ['invalid'] : [];
    if (payload.type === "ConnectionCreated") {
      const inputIndex = state.nodes.findIndex(
        (n) => n.id === payload.input.nodeId
      );
      const outputIndex = state.nodes.findIndex(
        (n) => n.id === payload.output.nodeId
      );

      const outputConnection = {
        nodeId: payload.output.nodeId,
        port: payload.output.port,
      };

      const inputConnection = {
        nodeId: payload.input.nodeId,
        port: payload.input.port,
      };

      state.nodes[inputIndex].inputs[payload.input.port].connection.push(
        outputConnection
      );
      state.nodes[outputIndex].outputs[payload.output.port].connection.push(
        inputConnection
      );
    } else if (payload.type === "ConnectionRemoved") {
      removeConnection(state, payload);
    } else if (payload.type === "NodeCreated") {
      state.nodes.push(payload.node);
    } else if (payload.type === "NodeSelected") {
      // eslint-disable-next-line no-unused-expressions
      state.popup.length === 0
        ? (state.popup.push(payload.node), state.openclose1.push(payload.type))
        : (state.popup.pop(), state.openclose1.pop());
    } else if (payload.type === "NodeRemoved") {
      for (const conn of payload.correspondingConnections) {
        removeConnection(state, conn);
      }
      const inputNode = state.nodes.findIndex((n) => n.id === payload.id);
      state.nodes.splice(inputNode, 1);
    }

    return Object.assign({}, state);
    // eslint-disable-next-line no-unreachable
  } else if (action.type === Actions.EDITOR_PROPERTIES) {
    const payload = action.payload;

    const obj = {
      id: payload.id,
      properties: payload.properties === null ? {} : payload,
    };

    state.output.push(obj);
  } else if (action.type === Actions.CREATE_WORKSPACE) {
    const payload = action.payload;
    const obj = {
      workspacename: payload.workspacename,
      Category: payload.Category,
    };

    state.workspace.push(obj);
    console.log("state.workspace", state.workspace);

  }

  return state;
};
