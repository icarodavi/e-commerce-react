import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { screen, renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { MainLayout } from ".";
import { queryClient } from "../../providers/ReactQuery";

jest.mock("use-context-selector");

describe("MainLayout Tests", () => {
    beforeEach(() => {
        (useContextSelector as jest.Mock).mockReturnValue({
            setMobileMenuOpen: jest.fn(),
            setMobileFiltersOpen: jest.fn(),
            mobileMenuOpen: false,
            mobileFiltersOpen: false,
        });
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => jest.fn(),
        }));
    });

    it("should be able to renders correctly", async () => {
        const useProducts = () => useQuery({
            queryKey: ["products"],
            queryFn: () => ({
                data: [{ id: 1 }],
            }),
        });

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="*"
                            element={(
                                <>
                                    <MainLayout>Home</MainLayout>
                                    {children}
                                </>
                            )}
                        />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useProducts(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(screen.queryByText(/Sign In/i)).toBeInTheDocument();
    });
});
