import { runFromNode } from "./dataflow";
import {
  autorunExample,
  autorunRootExample,
  missingStates,
  multiInput,
  simpleChain,
  simpleLoop,
  singleNode,
} from "./mocks";

test("set input for single node in the editor", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(singleNode, "1", { template: "Hello World" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchSnapshot();
});

test("set input for several nodes in the editor", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(simpleChain, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(3);
  expect(res).toMatchSnapshot();
});

test("ignore autorun=false flag on root node", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(autorunRootExample, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(3);
  expect(res).toMatchSnapshot();
});

test("nodes with autorun=false down the chain do not update the inputs of their targets", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(autorunExample, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});

test("avoid hanging on loops", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(simpleLoop, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});

test("can handle missing states", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(
    missingStates,
    "197375bb-c777-4be5-a423-6d5618e2200f",
    { template: "Hello {{World}}" },
    onNodeStateUpdate
  );
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(4);
  expect(res).toMatchSnapshot();
});

test("can handle input from multiple origins", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(multiInput, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(4);
  expect(res).toMatchSnapshot();
});

test("update array variables", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(
    simpleChain,
    "2",
    {
      variables: [
        { id: "world", name: "world", type: "text", description: "", defaultValue: "test1" },
        { id: "hello", name: "hello", type: "text", description: "", defaultValue: "test2" },
      ],
    },
    onNodeStateUpdate
  );
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});
