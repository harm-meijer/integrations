import React from "react";
import Link from "next/link";
export default function Layout(props) {
  return (
    <React.Fragment>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      <Link
        href="/products-of-category?category-slug=hello-world"
        as="/products-of-category/hello-world"
      >
        <a>products of category</a>
      </Link>
      {props.children}
    </React.Fragment>
  );
}
