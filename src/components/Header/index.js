import React from 'react';

const Header = () => {
    return(
        <header>
            <div className="d-flex">
                <img
                    src="/logo.png"
                    width="250"
                    className="ml-5 pl-5 mt-3"
                />
                <h4 className="mt-4 pt-3 ml-5">
                    <i className="fa fa-list mr-3"></i>
                    Zapotrzebowanie na etykiety
                </h4>
            </div>
            <hr/>
        </header>
    )
}

export default Header;
