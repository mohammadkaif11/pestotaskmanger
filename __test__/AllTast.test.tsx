import GetTask from "~/components/Tasks/get-all-task-components";
import { render } from "@testing-library/react";

describe("GetlAllTaskComponent", () => {
  test("renders no task cards when no tasks are provided", () => {
    const { container } = render(<GetTask tasks={[]} />);
    const cellElements = container.querySelectorAll("#taskcard");
    console.log("Cell elements", cellElements.length);
    expect(cellElements.length).toEqual(0);
  });
});
