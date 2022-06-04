const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const handleGraphplErrors = (errors) => {
  if (errors) {
    errors.forEach((e) => console.error(e.toString()))
  }
};

const getPages = async (graphql) => {
  const pagesQueryResult = await graphql(`{
    allMarkdownRemark(
      filter: {frontmatter: {elementType: {eq: "page"}}},
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            elementType
            title
            displayTitle
            mainImage {
              name
            }
            mainImageAlt
            description
            pageCategory
            references {
              type
              header
            }
          }
        }
      }
    }
  }`);

  const page_errors = pagesQueryResult?.errors;
  const pages = pagesQueryResult?.data?.allMarkdownRemark?.edges;

  handleGraphplErrors(page_errors)

  return {page_errors, pages};
};

const getHeaderBySlug = async (graphql, slug) => {
  const headerQueryResult = await graphql(`{
    allMarkdownRemark(filter: {
      frontmatter: {elementType: {eq: "header"}}
      fields: {slug: {eq: "/COMPONENTS/header/${slug}/"}}
    }, limit: 1) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            elementType
            title
            pageCategory
          }
        }
      }
    }
  }`);

  const header_errors = headerQueryResult?.errors;
  const header = headerQueryResult?.data?.allMarkdownRemark?.edges?.[0]?.node?.frontmatter;

  handleGraphplErrors(header_errors);

  return {header_errors, header};
};

const getBlogPostBySlug = async (graphql, slug) => {
  const blogPostQueryResult = await graphql(`{
    allMarkdownRemark(filter: {
      frontmatter: {elementType: {eq: "blog-post"}}
      fields: {slug: {eq: "/COMPONENTS/blogPosts/${slug}/"}}
    }, limit: 1) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            elementType
            title
            pageCategory
            description
            displayTitle
            label
            mainImage {
              name
            }
            mainImageAlt
            previewImage {
              name
            }
            previewImageAlt
            publishDate
          }
        }
      }
    }
  }`);

  console.log(blogPostQueryResult?.data?.allMarkdownRemark)

  const blogPost_errors = blogPostQueryResult?.errors;
  const blogPost = blogPostQueryResult?.data?.allMarkdownRemark?.edges?.[0]?.node?.frontmatter;

  handleGraphplErrors(blogPost_errors);

  return {blogPost_errors, blogPost};
};

const getPageCategoryBySlug = async (graphql, slug) => {
  const pageCategoryQueryResult = await graphql(`{
    allMarkdownRemark(filter: {
      frontmatter: {elementType: {eq: "pageCategory"}}
      fields: {slug: {eq: "/COMPONENTS/pageCategory/${slug}/"}}
    }) {
      edges {
        node {
          id
          frontmatter {
            label
            url
          }
        }
      }
    }
  }`);

  const pageCategory_errors = pageCategoryQueryResult?.errors;
  const pageCategory = pageCategoryQueryResult?.data?.allMarkdownRemark?.edges?.[0]?.node?.frontmatter;

  handleGraphplErrors(pageCategory_errors);

  return {pageCategory_errors, pageCategory};
};

// --------------------------------------------------------

const getHeaderComponentBySlug = async (graphql, slug) => {
  const {header_errors, header} = await getHeaderBySlug(graphql, slug);

  if (!header_errors){
    const headerLinksSlugs = header?.pageCategory;
    const headerLinks = [];

    for(let linkSlug of headerLinksSlugs) {
      const {pageCategory_errors, pageCategory} = await getPageCategoryBySlug(graphql, linkSlug)

      if (!pageCategory_errors) {
        headerLinks.push({
          label: pageCategory?.label,
          url: pageCategory?.url
        });
      }
    }

    if (headerLinks.length) {
      return {
        component: 'Header',
        props: {
          links: headerLinks
        }
      };
    }
  }

  return void 0;
};

const getBlogPostComponentBySlug = async (graphql, slug) => {
  const {blogPost_errors, blogPost} = await getBlogPostBySlug(graphql, slug);

  if (!blogPost_errors){
    return {
      component: 'BlogPost',
      props: {
        ...blogPost
      }
    };
  }

  return void 0;
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const {page_errors, pages} = await getPages(graphql);
  handleGraphplErrors(page_errors);
  if(page_errors) return page_errors;


  for(let page of pages) {
    let headerExists = false;
    const slug = page.node.fields.slug;
    const pageComponents = [];

    const title = page?.node?.frontmatter?.displayTitle;
    const description = page?.node?.frontmatter?.description;
    const mainImage = {...(page?.node?.frontmatter?.mainImage || {})}
    mainImage.alt = page?.node?.frontmatter?.mainImageAlt;

    for(let ref of page?.node?.frontmatter?.references) {
      console.log(ref)
      const refSlug = ref[ref?.type];

      if (ref?.type === 'header') {
        const headerComponent = await getHeaderComponentBySlug(graphql, refSlug);

        if (headerComponent) {
          if(!headerComponent.props) headerComponent.props = {};

          if(title) headerComponent.props.title = title;
          if(description) headerComponent.props.description = description;
          if(mainImage?.name) headerComponent.props.mainImage = mainImage;

          headerExists = true;

          pageComponents.push(headerComponent);
        }
      } else if (ref?.type === 'blogPost') {
        const blogPostComponent = await getBlogPostComponentBySlug(graphql, refSlug);
        pageComponents.push(blogPostComponent);
      }
    };

    const extraComponentsInTheBeginning = [];

    if(!headerExists) {
      if(title) extraComponentsInTheBeginning.push({component: 'Title', props: { title }});
      if(description) extraComponentsInTheBeginning.push({component: 'Description', props: { description }});
      if(mainImage?.name) extraComponentsInTheBeginning.push({component: 'Image', props: { image: mainImage }});
    }

    console.log(pageComponents);

    const pageCategory = page?.node?.frontmatter?.pageCategory;
    if(pageCategory?.length) {
      for(let categorySlug of pageCategory) {
        const {pageCategory_errors, pageCategory} = await getPageCategoryBySlug(graphql, categorySlug);
          if(!pageCategory_errors) {
            const pageSlug = pageCategory.url + slug;

            createPage({
              path: pageSlug,
              component: path.resolve(
                `src/components/Page/Page.js`
              ),
              // additional data can be passed via context
              context: {
                components: [...extraComponentsInTheBeginning, ...pageComponents]
              },
            })
          }
      }
    }
  };
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
