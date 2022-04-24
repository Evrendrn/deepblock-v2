import 'App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'components/common/layout';
import Index from 'components/pages';
import Token from 'components/pages/token';
import Team from 'components/pages/team';
import useEagerConnect from './hooks/useEagerConnect'

function App() {
  useEagerConnect()
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/token" exact component={Token} />
          <Route path="/team" exact component={Team} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
