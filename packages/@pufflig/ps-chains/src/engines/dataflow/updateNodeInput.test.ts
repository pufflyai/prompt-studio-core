import { simpleFlow, singleNodeFlow } from "../../mocks/chains";
import { updateNodeInput } from "./updateNodeInput";

test("updateNodeInput - singleNodeFlow", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await updateNodeInput(
    singleNodeFlow,
    "n1",
    { data: "Hello World" },
    {
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});

test("updateNodeInput - simpleFlow, the children nodes are not updated", async () => {
  const onNodeInputUpdate = jest.fn();
  const onNodeRunError = jest.fn();
  const res = await updateNodeInput(
    simpleFlow,
    "n1",
    { data: "Hello World" },
    {
      onNodeInputUpdate,
      onNodeRunError,
    }
  );
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(onNodeRunError).toHaveBeenCalledTimes(0);
  expect(res).toMatchSnapshot();
});
