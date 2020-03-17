import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import {
  StatementsOverviewPage,
  translations as statementTranslations
} from '@pingcap-incubator/statement'
import * as DashboardClient from '@pingcap-incubator/dashboard_client'
import * as authUtil from './auth'
import * as i18nUtil from './i18n'

import 'antd/dist/antd.css'

const dashboardClient = new DashboardClient.DefaultApi({
  basePath: 'http://127.0.0.1:12333/dashboard/api',
  apiKey: () => authUtil.getAuthTokenAsBearer()
})

dashboardClient
  .userLoginPost({
    username: 'root',
    password: '',
    is_tidb_auth: true
  })
  .then(r => authUtil.setAuthToken(r.data.token))

i18nUtil.init()
i18nUtil.addTranslations(statementTranslations)

const App = () => (
  <Router>
    <div style={{ margin: 12 }}>
      <StatementsOverviewPage
        dashboardClient={dashboardClient}
        detailPagePath="/statement/detail"
      />
    </div>
  </Router>
)

export default App
