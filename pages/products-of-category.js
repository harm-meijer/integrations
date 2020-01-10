import React from "react";
import Layout from "../components/Layout";
function ProductsOfCategory(props) {
  return (
    <Layout>
      <div>products of {props["category-slug"]}</div>
    </Layout>
  );
}
ProductsOfCategory.getInitialProps = async ({ query }) => {
  console.log("ok,now what", query);
  return Promise.resolve(query);
};
export default ProductsOfCategory;
