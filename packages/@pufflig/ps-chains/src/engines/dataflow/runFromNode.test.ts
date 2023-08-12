import {
  autorunExample,
  autorunRootExample,
  missingStates,
  multiInput,
  simpleChain,
  simpleLoop,
  singleNodeChain,
} from "../../mocks/chains";
import { runFromNode } from "./runFromNode";

test("set input for single node in the editor", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("1", { template: "Hello World" }, singleNodeChain, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchSnapshot();
});

test("set input for several nodes in the editor", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n1", { template: "Hello {{World}}" }, simpleChain, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(res).toMatchSnapshot();
});

test("ignore autorun=false flag on root node", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n1", { template: "Hello {{World}}" }, autorunRootExample, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(res).toMatchSnapshot();
});

test("nodes with autorun=false down the chain do not update the inputs of their targets", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n1", { template: "Hello {{World}}" }, autorunExample, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});

test("avoid hanging on loops", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n1", { template: "Hello {{World}}" }, simpleLoop, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});

test("can handle missing states", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n2", { template: "Hello {{World}}" }, missingStates, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(4);
  expect(res).toMatchSnapshot();
});

test("can handle input from multiple origins", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode("n1", { template: "Hello {{World}}" }, multiInput, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(4);
  expect(res).toMatchSnapshot();
});

test("update array variables", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await runFromNode(
    "n2",
    {
      variables: [
        { id: "world", name: "world", type: "text", description: "", defaultValue: "test1" },
        { id: "hello", name: "hello", type: "text", description: "", defaultValue: "test2" },
      ],
    },
    simpleChain,
    {
      onNodeInputUpdate,
      onNodeRunError: () => {},
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(res).toMatchSnapshot();
});
