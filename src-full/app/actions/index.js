import React from 'react'
import {Link} from 'react-router'

export const getNavLink = (linkUrl, children, props) => {
    props = {
        props,
        children
    }

    if (linkUrl.indexOf("link.pages-") < 0) 
        return <a href={linkUrl} {...props} />

    // TODO: search routes?
    return <Link to={linkUrl.replace("link.pages-", "")} {...props} />
}