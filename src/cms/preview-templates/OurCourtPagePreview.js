import React from 'react'
import PropTypes from 'prop-types'
import { OurCourtPageTemplate } from '../../templates/our-court-page'

const OurCourtPagePreview = ({ entry, widgetFor }) => {

  return (
  <>
    <OurCourtPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </>
  )
}

OurCourtPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default OurCourtPagePreview
