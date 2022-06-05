import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import { HeaderPreview } from './preview-templates/HeaderPreview';
import { BlogPostPreview } from './preview-templates/BlogPostPreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('header', HeaderPreview);
CMS.registerPreviewTemplate('blog-post', BlogPostPreview);
