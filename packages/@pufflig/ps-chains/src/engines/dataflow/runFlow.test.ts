import {
  configOnlyFlow,
  execWithLoop,
  loopWithJoin,
  mappedExample,
  multiInput,
  multiInputWithOutput,
  multiNodes,
  multistep,
  severalConnections,
  simpleExec,
  simpleExecWithData,
  simpleExistingState,
  simpleFlow,
  simpleFlowWithExec,
  simpleFlowWithVars,
  simpleLoop,
  singleNodeFlow,
} from "../../mocks/chains";
import { runFlow } from "./runFlow";
import { produce } from "immer";

/**
 * -> error
 */
test("should throw error if the node is undefined", async () => {
  try {
    await runFlow(singleNodeFlow, "not_a_node", { data: "Hello World" });
  } catch (err) {
    expect(err).toMatchSnapshot();
  }
});

test("should run even when lifecycle methods are missing", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    configOnlyFlow,
    "n1",
    { data: "Hello World" },
    {
      onNodeInputUpdate,
      onNodeRunError: () => {},
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(0);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1)
 */
test("run a flow with a single node", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    singleNodeFlow,
    "n1",
    { data: "Hello World" },
    {
      onNodeInputUpdate,
      onNodeRunError: () => {},
    }
  );
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
  const res = await runFlow(
    simpleFlow,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1x)   (x2x)
 *        ->  (2) -> (X)
 */
test("nodes with an execution input are not run without an execution connection", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    simpleFlowWithExec,
    "n1",
    { data: "Hello {{World}}" },
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
 * -> (1) -> (1)
 */
test("avoid hanging on loops", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    simpleLoop,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeInputUpdate,
      onNodeRunComplete,
      onNodeRunError,
    }
  );
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
  const res = await runFlow(
    simpleExistingState,
    "n1",
    { data1: "IS_OVERWRITTEN" },
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
 * -> (1a) -> (b2c) -> (a3)
 */
test("correctly map output from one node onto another", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    mappedExample,
    "n1",
    { data: "test data" },
    {
      onNodeInputUpdate,
      onNodeRunComplete,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) -----------> (a4)
 *       \--> (a3b) --> (b4)
 */
test("can handle input from multiple origins", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    multiInput,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
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
  const res = await runFlow(
    multiInputWithOutput,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(5);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(3);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) ---------> (a4c) --> (a5)
 *            (X) --> (b4)
 */
test("ignore inputs from unreachable nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();

  const chain = produce(multiInputWithOutput, (draftState) => {
    delete draftState.definition.edges.e1;
  });

  const res = await runFlow(
    chain,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1a) -----------------> (a4c) --> (a5)
 *            (X) --> (X) --> (b4)
 */
test("ignore inputs from nested unreachable nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();

  const chain = produce(multistep, (draftState) => {
    delete draftState.definition.edges.e1;
  });

  const res = await runFlow(
    chain,
    "n1",
    { data: "Hello {{World}}" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
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
  const res = await runFlow(
    simpleFlow,
    "n2",
    {
      variables: [
        { id: "world", name: "world", type: "text", description: "", defaultValue: "test1" },
        { id: "hello", name: "hello", type: "text", description: "", defaultValue: "test2" },
      ],
    },
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
  const res = await runFlow(
    simpleFlowWithVars,
    "n1",
    {},
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
      resolveReferences: async (variable) => {
        if (variable === "file:MY_FILE") {
          return "INSERTED_FILE";
        }
        return "${{ps:ref:" + variable + "}}";
      },
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * -> (1) => (2) => (3)
 */
test("run nodes connected through execution nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    simpleExec,
    "n1",
    {},
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(2);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1) => (2) => (3)
 *         ^
 */
test("do not run an executable node unless the parent was run already", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    simpleExec,
    "n2",
    {},
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(0);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1) => (2) => (X)
 *
 */
test("when running a flow in dataflow mode, do no run child executable nodes", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    simpleExecWithData,
    "n1",
    {},
    {
      mode: "dataflow",
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1) => (🔄2) =2> (3) =2> (4)
 *
 */
test("a node can run its children multiple times", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    execWithLoop,
    "n1",
    {},
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(6);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(4);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (0) => (🔄1) =2> (2) =2> (3)
 */
test("a node can run its children multiple times 2", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    loopWithJoin,
    "n0",
    {},
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(8);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(4);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1.1) -> (2.1)
 *       -> (2.2)
 */
test("running a node with several connections to a child should update the child correctly", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    severalConnections,
    "n1",
    { data: "TEST DATA" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(3);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

/**
 * (1.1)a -> (2.1)a
 * (1.2)x -> (2.2)b
 */
test("running a node with a missing value does not override the default value in the target node", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunComplete = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await runFlow(
    multiNodes,
    "n1",
    { data1: "TEST DATA" },
    {
      onNodeRunComplete,
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(2);
  expect(onNodeRunComplete).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});
