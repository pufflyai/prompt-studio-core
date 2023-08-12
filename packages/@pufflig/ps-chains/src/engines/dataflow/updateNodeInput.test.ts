import { simpleChain, singleNodeChain } from "../../mocks/chains";
import { updateNodeInput } from "./updateNodeInput";

test("updateNodeInput - singleNodeChain", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await updateNodeInput("1", { template: "Hello World" }, singleNodeChain, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchSnapshot();
});

test("updateNodeInput - simpleChain, the children nodes are not updated", async () => {
  const onNodeInputUpdate = jest.fn();
  const res = await updateNodeInput("n1", { template: "Hello World" }, simpleChain, {
    onNodeInputUpdate,
    onNodeRunError: () => {},
  });
  expect(onNodeInputUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchSnapshot();
});
