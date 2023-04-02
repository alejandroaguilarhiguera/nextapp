import React, { PropsWithChildren } from 'react';
import AppBar from '~/components/AppBar';

interface Props {

}


const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <AppBar>
            {children}
        </AppBar>
    );
};

export default Layout;