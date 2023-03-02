import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { graphql } from "gatsby";
import { toggleShowMenu } from "../redux/actions/layout";
import Layout from "../components/Layout";
import { SEO } from "../components/seo";

export const query = graphql`
  query MyQuery {
    allSanityCalendar {
      edges {
        node {
          _id
          title
          startDateTime
          endDateTime
          contact
          url
          description
        }
      }
    }
  }
`;

const Contact = ({ data }) => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.layout.showMenu);
  const [events, setEvents] = useState(
    data.allSanityCalendar.edges.sort((a, b) =>
      a.startDateTime < b.startDateTime ? 1 : -1
    )
  );

  useEffect(() => {
    dispatch(toggleShowMenu(false));
  }, []);

  return (
    <Layout>
      <div
        page={"contact"}
        className={`${
          showMenu && "pointer-events-none"
        } pt-20 flex justify-center bg-gray-100`}
      >
        <div className={`max-w-[1200px]`}>
          <div
            className={`px-12 py-8 min-h-screen bg-gray-100 transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}
          >
            <div className={`flex justify-center px-8 py-4 bg-orange-200 mt-4`}>
              Page in progress...
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

export const Head = () => <SEO title="contact" />;
