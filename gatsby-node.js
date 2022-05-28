const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const slugs = {}

  return graphql(`{
    allMarkdownRemark(
      filter: {frontmatter: {elementType: {eq: "page"}}},
      limit: 1000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            elementType
            title
            displayTitle
            mainImage
            description
            pageCategory
            references {
              type
              header
              blogPost
            }
          }
        }
      }
    }
  }`)
  .then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(page => {
      console.log(page);
    });
  })

  // return graphql(`
    // {
    //   allMarkdownRemark(limit: 1000) {
    //     edges {
    //       node {
    //         id
    //         fields {
    //           slug
    //         }
    //         frontmatter {
    //           tags
    //           templateKey
    //           Reference
    //         }
    //       }
    //     }
    //   }
    // }
  // `).then((result) => {
  //   if (result.errors) {
  //     result.errors.forEach((e) => console.error(e.toString()))
  //     return Promise.reject(result.errors)
  //   }

  //   const posts = result.data.allMarkdownRemark.edges

  //   posts.forEach((edge) => {
  //     const id = edge.node.id
  //     const Reference  = edge.node.frontmatter.Reference;
  //     console.log(Reference)
  //     createPage({
  //       path: edge.node.fields.slug,
  //       tags: edge.node.frontmatter.tags,
  //       component: path.resolve(
  //         `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
  //       ),
  //       // additional data can be passed via context
  //       context: {
  //         id,
  //         ...(Reference ? { Reference: Reference.map(r => '/blog/' + r + '/') } : {})
  //       },
  //     })
  //   })
  // })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // const { createNodeField } = actions
  // fmImagesToRelative(node) // convert image paths for gatsby images

  // if (node.internal.type === `MarkdownRemark`) {
  //   const value = createFilePath({ node, getNode })
  //   createNodeField({
  //     name: `slug`,
  //     node,
  //     value,
  //   })
  // }
}
