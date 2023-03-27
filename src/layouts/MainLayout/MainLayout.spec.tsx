import { render } from "@testing-library/react";
import { MainLayout } from ".";

describe("MainLayout Tests", () => {
    it("should be able to renders correctly", () => {
        render(<MainLayout>Home</MainLayout>);
    });
});
