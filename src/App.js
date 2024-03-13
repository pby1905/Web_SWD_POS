import { BrowserRouter } from 'react-router-dom';
import RouterCustom from '~/routes/routes';

import { Helmet } from 'react-helmet';

function App() {
    return (
        <div className="App">
            <Helmet>
                <meta charSet="utf-8" />
                <title></title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name="description" content="Helmet application" />
            </Helmet>

            <BrowserRouter>
                <RouterCustom></RouterCustom>
            </BrowserRouter>
        </div>
    );
}

export default App;
