import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import { HeaderPreview } from './preview-templates/HeaderPreview';
import { BlogPostPreview } from './preview-templates/BlogPostPreview';
import { ImageGalleryPreview } from './preview-templates/ImageGalleryPreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('headers', HeaderPreview);
CMS.registerPreviewTemplate('blog-posts', BlogPostPreview);
CMS.registerPreviewTemplate('image-galleries', ImageGalleryPreview);
