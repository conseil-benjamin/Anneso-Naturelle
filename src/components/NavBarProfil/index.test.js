import NavBarProfil from "./NavBarProfil";
import { render } from "@testing-library/react";

describe("NavBarProfil", () => {
  test("Should render without crash", async () => {
    render(<NavBarProfil />);
  });
});
