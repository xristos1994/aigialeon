const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const trainingsQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              title
              sections {
                pages {
                  body
                  pageTitle
                }
                sectionTitle
              }
            }
          }
        }
      }
    }
  `);

  const slugify = (phrase) => {
    return phrase.toLowerCase().split(' ').join('-');
  };

  const errors = trainingsQueryResult?.errors;
  const trainings = trainingsQueryResult?.data?.allMarkdownRemark?.edges;

  const trainingsData = [];

  let trainingCounter = 0;
  let sectionCounter = 0;
  let pageCounter = 0;

  if (!errors) {
    trainings.forEach(({ node, trainingIndex }) => {
      trainingCounter++;
      const pages = [];
      const training = node;
      const trainingSlug = slugify(training.frontmatter.title);

      const finalTraining = {
        title: training.frontmatter.title,
        sections: [],
      };

      training.frontmatter.sections.forEach((section) => {
        sectionCounter++;
        const sectionSlug = slugify(section.sectionTitle);
        const finalSection = {
          title: section.sectionTitle,
          pages: [],
        };

        section.pages.forEach((page) => {
          pageCounter++;
          let slug = `/${trainingSlug}/${sectionSlug}/${slugify(page.pageTitle)}-${pageCounter}`;
          const numOfPagesWithTheSameSlug = pages.filter(p => p.slug === slug).length;
          slug = slug + (numOfPagesWithTheSameSlug === 0 ? '' : `---${numOfPagesWithTheSameSlug}`);

          pages.push({
            title: page.pageTitle,
            slug,
            body: page.body
          })

          finalSection.pages.push({
            title: page.pageTitle,
            slug: `/${trainingSlug}/${sectionSlug}/${slugify(page.pageTitle)}`, // FIXME: Check if slug already exists
          });
        });

        finalTraining.sections.push(finalSection);
      });

      trainingsData.push(finalTraining);

      const numOfPages = pages.length;

      pages.forEach((page, index) => {
        const prevSlug = index === 0 ? '' : pages[index - 1].slug;
        const nextSlug = index === numOfPages - 1 ? '' : pages[index + 1].slug;
        const currentPageIndex = index + 1;

        console.log(`------------- ${trainingIndex} - ${currentPageIndex} -> ${page.slug}------------`);

        createPage({
          path: page.slug, // FIXME: Check if slug already exists,
          component: path.resolve(`src/components/TrainingPage/TrainingPage.jsx`),
          context: {
            title: page.title,
            body: page.body,
            prevSlug,
            nextSlug,
            currentPageIndex,
            numOfPages,
            trainingsData
          }
        });

      })
    });
  }

  console.log(trainingsData);
};
