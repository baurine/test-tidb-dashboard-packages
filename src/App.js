import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {
  // StatementsOverviewPage,
  // StatementDetailPage,
  RootComponent as StatementRootComponent,
  translations as statementTranslations,
} from '@pingcap-incubator/statement'
import {
  KeyVis,
  translations as keyvisTranslations,
} from '@pingcap-incubator/keyvis'
import DashboardClient, {
  DefaultApi,
} from '@pingcap-incubator/dashboard_client'
import * as authUtil from './auth'
import * as i18nUtil from './i18n'

// no need any more
// import 'antd/dist/antd.css'

i18nUtil.init()
i18nUtil.addTranslations(statementTranslations)
i18nUtil.addTranslations(keyvisTranslations)

const basePath = 'http://127.0.0.1:12333/dashboard/api'

const dashboardClient = new DefaultApi({
  basePath,
  apiKey: () => authUtil.getAuthTokenAsBearer(),
})
DashboardClient.init(basePath, dashboardClient)
DashboardClient.getInstance()
  .userLoginPost({
    username: 'root',
    password: '',
    is_tidb_auth: true,
  })
  .then((r) => authUtil.setAuthToken(r.data.token))

const App = () => (
  <Router>
    <div style={{ margin: 12 }}>
      <Switch>
        {/*
        <Route path="/statement/overview">
          <StatementsOverviewPage
            dashboardClient={dashboardClient}
            detailPagePath="/statement/detail"
          />
        </Route>
        <Route path="/statement/detail">
          <StatementDetailPage dashboardClient={dashboardClient} />
        </Route>
        */}
        <Route path="/statement">
          <StatementRootComponent />
        </Route>
        <Route path="/keyvis">
          <KeyVis />
        </Route>
        <Redirect exact from="/" to="/statement" />
      </Switch>
    </div>
  </Router>
)

export default App
