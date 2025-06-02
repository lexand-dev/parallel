import { Suspense } from "react";
import { PreloadQuery } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { ClientChild } from "../clien-child";

const QUERY = gql`
  query Query {
    hello
  }
`;

const TestPage = () => {
  return (
    <PreloadQuery query={QUERY}>
      <Suspense fallback={<div>loading</div>}>
        <ClientChild />
      </Suspense>
    </PreloadQuery>
  );
};

export default TestPage;
