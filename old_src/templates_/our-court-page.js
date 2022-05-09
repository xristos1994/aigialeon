import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { BlogPostTemplate } from '../templates/blog-post';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line
export const OurCourtPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className='section section--gradient'>
      <div className='container'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <div className='section'>
              <h2 className='title is-size-3 has-text-weight-bold is-bold-light'>
                {title}
              </h2>
              <PageContent className='content' content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

OurCourtPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const OurCourtPage = ({ data }) => {


  const post = data.post;
  const page = data.page;

  return (
    <Layout>
      <OurCourtPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        content={page.html}
      />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate='%s | Blog'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

OurCourtPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OurCourtPage;

export const OurCourtPageQuery = graphql`
  query OurCourtPage($id: String!, $Reference: [String]!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    post: markdownRemark(
      frontmatter: { templateKey: { eq: "blog-post" } }
      fields: {
        slug: {
          in: $Reference
        }
      }
    ) {
      id
      fields {
        slug
      }
      html
      frontmatter {
        title
        description
        templateKey
        date(formatString: "MMMM DD, YYYY")
        featuredpost
        featuredimage {
          childImageSharp {
            gatsbyImageData(width: 120, quality: 100, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
