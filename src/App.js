import React from 'react'
import { HashRouter as Router, Routes, Route, Redirect } from 'react-router-dom'
import {
  // StatementsOverviewPage,
  // StatementDetailPage,
  RootComponent as StatementRootComponent,
  translations as statementTranslations
} from '@pingcap-incubator/statement'
import {
  KeyVis,
  translations as keyvisTranslations
} from '@pingcap-incubator/keyvis'
import DashboardClient, {
  DefaultApi
} from '@pingcap-incubator/dashboard_client'
import * as authUtil from './auth'
import * as i18nUtil from './i18n'

// no need any more
// import 'antd/dist/antd.css'

i18nUtil.init()
i18nUtil.addTranslations(statementTranslations)
i18nUtil.addTranslations(keyvisTranslations)

const dashboardClient = new DefaultApi({
  basePath: 'http://127.0.0.1:12333/dashboard/api',
  apiKey: () => authUtil.getAuthTokenAsBearer()
})
DashboardClient.setInstance(dashboardClient)
DashboardClient.getInstance()
  .userLoginPost({
    username: 'root',
    password: '',
    is_tidb_auth: true
  })
  .then(r => authUtil.setAuthToken(r.data.token))

const App = () => (
  <Router>
    <div style={{ margin: 12 }}>
      <Routes>
        {/* notice, in v6, the path should be "/statement/*", can't be "/statement" */}
        <Route path="/statement/*" element={<StatementRootComponent />} />
        <Route path="/keyvis" element={<KeyVis />} />
        <Redirect from="/" to="/statement" />
      </Routes>
    </div>
  </Router>
)

export default App
