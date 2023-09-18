import { VirtuosoGridMockContext } from "react-virtuoso";

type WrapperProps = {
  children: React.ReactNode;
};

type VirtuosoGridMockWrapperProps = {
  viewportHeight: number;
  viewportWidth: number;
  itemHeight: number;
  itemWidth: number;
};

export const VirtuosoGridMockWrapper =
  (props: VirtuosoGridMockWrapperProps) =>
  ({ children }: WrapperProps) =>
    (
      <VirtuosoGridMockContext.Provider value={props}>
        {children}
      </VirtuosoGridMockContext.Provider>
    );
