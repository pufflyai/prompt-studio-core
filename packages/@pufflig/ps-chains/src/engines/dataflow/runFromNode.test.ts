import {
  autorunExample,
  mappedExample,
  multiInput,
  multiInputWithOutput,
  multistep,
  simpleChain,
  simpleChainWithVars,
  simpleExistingState,
  simpleLoop,
  singleNodeChain,
} from "../../mocks/chains";
import { runFromNode } from "./runFromNode";
import { produce } from "immer";

/**
 * -> error
 */
test("should throw error if the node is undefined", async () => {
  try {
    await runFromNode("not_a_node", { data: "Hello World" }, singleNodeChain);
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

/**
 * -> (1)
 */
test("run a single node chain", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello World" }, singleNodeChain, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(0);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1) -> (2)
 */
test("running a node updates the input of its children", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, simpleChain, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1[X]) -> (2)
 */
test("ignore autorun=false flag on root node", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const simpleChainWithAutorunFalse = {
    ...simpleChain,
    definition: {
      ...simpleChain.definition,
      nodes: {
        ...simpleChain.definition.nodes,
        n1: {
          ...simpleChain.definition.nodes.n1,
          autorun: false,
        },
      },
    },
  };
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, simpleChainWithAutorunFalse, {
    onNodeInputUpdate,
    onNodeRunComplete,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1) -> (2[X]) -> (X)
 */
test("nodes with autorun=false down the chain do not update the inputs of their targets", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, autorunExample, {
    onNodeInputUpdate,
    onNodeRunComplete,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1) -> (1)
 */
test("avoid hanging on loops", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, simpleLoop, {
    onNodeInputUpdate,
    onNodeRunComplete,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1)
 */
test("merge existing state on input", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data1: "IS_OVERWRITTEN" }, simpleExistingState, {
    onNodeInputUpdate,
    onNodeRunComplete,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(0);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) -> (b2c) -> (a3)
 */
test("correctly map output from one node onto another", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "test data" }, mappedExample, {
    onNodeInputUpdate,
    onNodeRunComplete,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * b -> (a1)
 */
test.skip("ignore inputs that are not part of a node definition", async () => {});

/**
 * -> (1a) -----------> (a4)
 *       \--> (a3b) --> (b4)
 */
test("can handle input from multiple origins", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, multiInput, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(4);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) -----------> (a4c) --> (a5)
 *       \--> (a3b) --> (b4)
 */
test("only run a node once all inputs are resolved", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", { data: "Hello {{World}}" }, multiInputWithOutput, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(5);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(3);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) ---------> (a4c) --> (a5)
 *       \--> (X) --> (b4)
 */
test("ignore inputs from unreachable nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();

  const chain = produce(multiInputWithOutput, (draftState) => {
    draftState.definition.nodes["n2"].autorun = false;
  });

  const res = await runFromNode("n1", { data: "Hello {{World}}" }, chain, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(4);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) -----------------> (a4c) --> (a5)
 *       \--> (X) --> (X) --> (b4)
 */
test.only("ignore inputs from nested unreachable nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();

  const chain = produce(multistep, (draftState) => {
    draftState.definition.nodes["n2"].autorun = false;
  });

  const res = await runFromNode("n1", { data: "Hello {{World}}" }, chain, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(4);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1) -> (2)
 *         ^
 */
test("update array variables", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
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
      onNodeRunComplete,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(0);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1*ref) -> (2)
 */
test("can resolve variables correctly", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFromNode("n1", {}, simpleChainWithVars, {
    onNodeRunComplete,
    onNodeInputUpdate,
    onNodeRunError,
    resolveReferences: async (variable) => {
      if (variable === "file:MY_FILE") {
        return "INSERTED_FILE";
      }
      return "${{ps:ref:" + variable + "}}";
    },
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});
