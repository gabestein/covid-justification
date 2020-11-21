import React from "react";
import { AttitudeContent } from "../lib/attitudes";
import AttitudeItem from "./AttitudeItem";
import Pagination from "./Pagination";

type Props = {
  attitudes: AttitudeContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function AttitudeList({ attitudes, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className={"attitudes"}>
        <ul className={"post-list"}>
          {attitudes.map((it, i) => (
            <li key={i}>
              <AttitudeItem attitude={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/attitudes" : "/attitudes/page/[page]"),
            as: (page) => (page === 1 ? null : "/attidudes/page/" + page),
          }}
        />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
