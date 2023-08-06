import { runFromNode } from "./dataflow";
import { autorunExample, autorunRootExample, simpleChain, simpleLoop, singleNode } from "./mocks";

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
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchSnapshot();
});
