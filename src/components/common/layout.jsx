import React from 'react';
import PropTypes from "prop-types";

import Header from 'components/common/header';
import Footer from 'components/common/footer';

const Layout = ({ children }) => {
    console.log("children is", typeof children);

    return (
        <div className="page-wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    chidren: PropTypes.object
}

export default Layout;